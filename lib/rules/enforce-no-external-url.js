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
 * Message IDs used for rule reporting
 * @type {Object}
 */
const MESSAGE_IDS = {
    EXTERNAL_URL: "externalURL",
}

/**
 * ESLint rule to disallow external URLs in HTML elements
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Disallow external includes.",
            recommended: true,
        },
        fixable: null,
        schema: [
            {
                type: "object",
                properties: {
                    ignoreDomains: {
                        type: "array",
                        items: {
                            type: "string",
                        }
                    },
                    attributes: {
                        type: "array",
                        items: {
                            type: "string",
                        }
                    }
                }
            }
        ],
        messages: {
            [MESSAGE_IDS.EXTERNAL_URL]: "External resource",
        }
    },
    /**
     * Creates a rule handler for detecting external URLs in HTML elements
     * @param {import('eslint').Rule.RuleContext} context - The ESLint rule context
     * @returns {Object} - ESLint visitor object with handlers for relevant HTML nodes
     */
    create(context) {
        const ignoreDomains = (context.options && context.options[0] && context.options[0].ignoreDomains) || [];
        const attributes = (context.options && context.options[0] && context.options[0].attributes) || ["script.src", "link.href"];

        return {
            /**
             * Handler for HTML attribute nodes
             * @param {Object} attr - The HTML attribute node
             */
            Attribute(attr) {
                if (!attributes.includes(`${(attr.parent.name || (attr.parent.type === "ScriptTag" ? "script" : null))}.${attr.key.value}`.toLowerCase())) {
                    return;
                }

                if (!isInternalOrIgnored(attr.parent, attr.key.value, ignoreDomains)) {
                    context.report({
                        node: {
                            loc: {
                                start: attr.parent.openStart.loc.start,
                                end: attr.parent.openEnd.loc.end,
                            },
                            range: [
                                attr.parent.openStart.range[0],
                                attr.parent.openEnd.range[1]],
                        },
                        messageId: MESSAGE_IDS.EXTERNAL_URL,
                    })
                }
            }
        };
    },
}
