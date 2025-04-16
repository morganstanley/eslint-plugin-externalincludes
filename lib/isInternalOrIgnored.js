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

/**
 * Determines if a URL in an HTML attribute is internal or from an ignored domain
 * 
 * @param {Object} node - The HTML element node being examined
 * @param {string} attrMatch - The attribute name to match (e.g., 'src', 'href')
 * @param {string[]} ignoreDomains - Array of domain names to ignore when checking for external URLs
 * @returns {boolean} - Returns true if the URL is internal or from an ignored domain, false otherwise
 */
function isInternalOrIgnored(node, attrMatch, ignoreDomains = []) {
    // Defensive: treat non-string or empty input as external
    if (typeof node !== 'object' || !node || typeof attrMatch !== 'string' || !attrMatch) return false;

    const externalSrcRegEx = /(?=(^(http|https)*:*\/\/[a-zA-Z0-9-]*\.))\1/;

    return node.attributes.some((attr) => {
        if (attr.key && attr.value && attrMatch &&
              0 === attr.key.value.toString().localeCompare(attrMatch, undefined, { sensitivity: 'base' })) {
            if (!externalSrcRegEx.test(attr.value.value)) {
                return true;
            }

            return ignoreDomains.find(domain => {
                const r = `//.*${domain.replaceAll('.', '\\.')}/`;
                return  ((new RegExp(r)).test(attr.value.value));
            });
        }

        return false;
    });
}
exports.isInternalOrIgnored = isInternalOrIgnored;
