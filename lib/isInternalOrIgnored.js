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

const PLACEHOLDER_HOST = 'internal.invalid';

/**
 * Determines if a URL in an HTML attribute is internal or from an allowlisted domain.
 *
 * Uses the WHATWG URL parser (resolved against an internal placeholder base) instead
 * of an ad-hoc regex, so URLs are classified the same way a browser would parse them:
 * scheme matching is case-insensitive, hostnames are normalized, and only http(s) values
 * are treated as web resources. Relative paths resolve onto the placeholder host and are
 * treated as internal. Protocol-relative URLs (`//host/...`) are resolved through the same
 * parser call - per the WHATWG URL spec, resolving a `//host` reference against a base
 * copies the base's scheme and replaces the host from the reference, exactly like a browser
 * resolving `<script src="//host/path">` - so userinfo, IPv6 literals, and ports are all
 * parsed correctly instead of hand-split, and the result is always classified as external
 * unless allowlisted.
 *
 * @param {Object} node - The HTML element node being examined
 * @param {string} attrMatch - The attribute name to match (e.g., 'src', 'href')
 * @param {string[]} ignoreDomains - Domain names whose http(s) hosts are treated as internal.
 *                                   Entries are compared as literal hostnames; a leading `.`
 *                                   is optional, and matching is exact or host-boundary suffix.
 * @returns {boolean} - Returns true if the URL is internal or from an allowlisted domain.
 */
function isInternalOrIgnored(node, attrMatch, ignoreDomains = []) {
    // Defensive: treat non-string or empty input as external
    if (typeof node !== 'object' || !node || typeof attrMatch !== 'string' || !attrMatch) return false;
    if (!Array.isArray(node.attributes)) return false;

    return node.attributes.some((attr) => {
        if (!(attr && attr.key && attr.value && attr.key.value != null && attr.value.value != null)) return false;
        if (0 !== attr.key.value.toString().localeCompare(attrMatch, undefined, { sensitivity: 'base' })) return false;

        const raw = String(attr.value.value).trim();
        if (raw === '') return true;

        // Parse against a placeholder base. This uniformly resolves absolute URLs,
        // protocol-relative URLs, and relative paths through the same WHATWG algorithm.
        // Anything other than http/https (data:, javascript:, file:, blob:, ...) is
        // treated as external/unsafe.
        let parsed;
        try { parsed = new URL(raw, `http://${PLACEHOLDER_HOST}/`); }
        catch (e) { return false; }

        const scheme = parsed.protocol.toLowerCase();
        if (scheme !== 'http:' && scheme !== 'https:') return false;
        if (parsed.hostname.toLowerCase() === PLACEHOLDER_HOST) return true; // relative path

        return matchesIgnore(parsed.hostname.toLowerCase(), ignoreDomains);
    });
}

/**
 * Checks whether a hostname matches any allowlisted domain, exactly or as a subdomain.
 *
 * @param {string} hostname - The lowercased hostname to check
 * @param {string[]} ignoreDomains - Allowlisted domain entries (optionally leading-dot)
 * @returns {boolean} - True if hostname equals or is a subdomain of an allowlisted entry.
 */
function matchesIgnore(hostname, ignoreDomains) {
    return ignoreDomains.some((d) => {
        if (typeof d !== 'string' || !d) return false;
        const dom = d.toLowerCase().replace(/^\./, '');
        return hostname === dom || hostname.endsWith('.' + dom);
    });
}

exports.isInternalOrIgnored = isInternalOrIgnored;
