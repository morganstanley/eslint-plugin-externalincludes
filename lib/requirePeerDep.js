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

"use strict";

/**
 * Requires a peer dependency, rethrowing a clearer, actionable error if it isn't
 * installed rather than letting a bare `MODULE_NOT_FOUND` surface to the consumer.
 *
 * @param {string} name - The peer dependency's package name
 * @returns {*} - The required module
 */
function requirePeerDep(name) {
    try {
        return require(name);
    } catch (e) {
        if (e && e.code === "MODULE_NOT_FOUND") {
            throw new Error(
                `@morgan-stanley/eslint-plugin-externalincludes requires the peer dependency "${name}" ` +
                `to be installed. Run \`npm install ${name}\` (most package managers install peer ` +
                "dependencies automatically, but this one didn't get installed) and try again."
            );
        }
        throw e;
    }
}

exports.requirePeerDep = requirePeerDep;
