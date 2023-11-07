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

const createRuleTester = require("../../lib/rule-tester")
const rule = require("../../../lib/rules/require-script-integrity");

const ruleTester = createRuleTester();

ruleTester.run(
    "require-script-integrity",
    rule,
    {
        valid: [
            {
                code:`
<script src="foo.js" integrity="foobar" />
`
            },
            {
                code:`
<script src="foo.js" />
`
            },            
            {
                code:`
<html>
    <head>
        <script src="foo.js" integrity="foobar" />
    </head>
    <body></body>
</html>
`
            },
            {
                code:`
<script src="https://www.foo.com/foo.js" />
`,
                options: [
                    {
                        ignoreDomains: [ ".foo.com" ],
                    },
                ],
            },
            {
                code:`
<script src="//www.foo.com/foo.js" />
`,
                options: [
                    {
                        ignoreDomains: [ ".foo.com" ],
                    },
                ],
            },
        ],
        invalid: [
            {
                code:`
<script src="https://www.myfoo.com/foo.js" />
`,
                options: [
                    {
                        ignoreDomains: [ ".foo.com" ],
                    },
                ],
                errors: [
                    {
                        messageId: "missingIntegrity",
                    }
                ]
            },
            {
                code:`
<script src="https://www.bar.com/foo.js" />
`,
                options: [
                    {
                        ignoreDomains: [ "foo.com" ],
                    },
                ],
                errors: [
                    {
                        messageId: "missingIntegrity",
                    }
                ]
            },
            {
                code:`
<html>
    <head>
        <script src="//test.com/foo.js" />
    </head>
    <body></body>
</html>
`,
                errors: [
                    {
                        messageId: "missingIntegrity",
                        line: 4,
                        column: 9,
                        endColumn: 43,
                        endLine: 4
                    }
                ]
            },
        ],
    }
);
