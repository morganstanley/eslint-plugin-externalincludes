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

const MESSAGE_IDS = {
    MISSING_INTEGRITY: "missingIntegrity",
}

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
    create(context) {
        const ignoreDomains = (context.options && context.options[0] && context.options[0].ignoreDomains) || [];

        return {
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

function hasIntegrityAttrAndValue(node) {
    return node.attributes.some((attr) => {
        if (attr.key && attr.value) {
            return ((attr.key.value === "integrity" && typeof attr.value.value === "string" && attr.value.value !== ""));
        }
    });
}
