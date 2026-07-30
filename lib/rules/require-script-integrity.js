/*
 * Morgan Stanley makes this available to you under the Apache License,
 * Version 2.0 (the "License"). You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0.
 *
 * See the NOTICE file distributed with this work for additional information
 * regarding copyright ownership. Unless required by applicable law or agreed
 * to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

const { isInternalOrIgnored } = require("../isInternalOrIgnored");

/**
 * Subresource Integrity grammar - a single hash or whitespace-separated list of hashes,
 * each `<algo>-<base64>` where algo is one of sha256/sha384/sha512. Anything else
 * (including sha1, md5, junk strings, whitespace-only values, placeholders) is rejected.
 *
 * Spec: https://www.w3.org/TR/SRI/#the-integrity-attribute
 * @type {RegExp}
 */
const SRI_RE = /^(sha(256|384|512)-[A-Za-z0-9+/]+={0,2})(\s+sha(256|384|512)-[A-Za-z0-9+/]+={0,2})*$/;

/**
 * The HTML attribute name that carries the SRI hash. HTML attribute names are
 * case-insensitive, so comparisons against this constant are done in lowercase.
 * @type {string}
 */
const INTEGRITY_KEY = "integrity";

/**
 * Message IDs used for rule reporting
 * @type {Object}
 */
const MESSAGE_IDS = {
    MISSING_INTEGRITY: "missingIntegrity",
}

/**
 * ESLint rule to require integrity attributes on script tags
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Require `integrity` attribute at `<script>` tag.",
            recommended: false,
        },
        fixable: null,
        schema: [
            {
                type:"object",
                properties: {
                    ignoreDomains: {
                        type: "array",
                        items: {
                            type: "string",
                        }
                    }
                }
            }
        ],
        messages: {
            [MESSAGE_IDS.MISSING_INTEGRITY]: "Missing `integrity` attribute",
        }
    },
    /**
     * Creates a rule handler for checking integrity attributes on script tags
     * @param {import('eslint').Rule.RuleContext} context - The ESLint rule context
     * @returns {Object} - ESLint visitor object with handlers for relevant HTML nodes
     */
    create(context) {
        const ignoreDomains = (context.options && context.options[0] && context.options[0].ignoreDomains) || [];

        return {
            /**
             * Handler for script tag nodes
             * @param {Object} node - The script tag node
             */
            ScriptTag(node) {
                if (isInternalOrIgnored(node, "src", ignoreDomains)) {
                    return;            
                }

                if (!hasIntegrityAttrAndValue(node)) {
                    context.report({
                        node: {
                            loc: {
                                start: node.openStart.loc.start,
                                end: node.openEnd.loc.end,
                            },
                            range: [
                                node.openStart.range[0],
                                node.openEnd.range[1]],
                        },
                        messageId: MESSAGE_IDS.MISSING_INTEGRITY,
                    })
                }
            }
        };
    },
}

/**
 * Checks if a node has an integrity attribute whose value matches the SRI grammar
 * @param {Object} node - The HTML element node to check
 * @returns {boolean} - Returns true if the node has a valid integrity attribute, false otherwise
 */
function hasIntegrityAttrAndValue(node) {
    return node.attributes.some((attr) => {
        if (!attr || !attr.key || !attr.value) return false;
        const key = String(attr.key.value || "").toLowerCase();
        if (key !== INTEGRITY_KEY) return false;
        const value = String(attr.value.value || "").trim();
        return SRI_RE.test(value);
    });
}
