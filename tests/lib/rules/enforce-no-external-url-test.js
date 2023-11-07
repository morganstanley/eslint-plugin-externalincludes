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

const createRuleTester = require("../rule-tester")
const rule = require("../../../lib/rules/enforce-no-external-url");

const ruleTester = createRuleTester();

ruleTester.run(
    "enforce-no-external-url",
    rule,
    {
        valid: [
            {
                code:`
<script src="foo.js" />
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
        <script src="foo.js" />
    </head>
    <body></body>
</html>
`
            },
            {
                code:`
<script src="//foo/foo.js" />
`
            },
            {
                code:`
<script src="https://www.foo.com/foo.js" />
`,
                options: [
                    {
                        ignoreDomains: [ ".test.com", ".foo.com" ],
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
<script SRC="https://www.myfoo.com/foo.js" />
`,
                errors: [
                    {
                        messageId: "externalURL",
                    }
                ]
            },
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
                        messageId: "externalURL",
                    }
                ]
            },
            {
                code:`
<img src="https://www.myfoo.com/foo.png" />
`,
                options: [
                    {
                        attributes: [ "img.src" ],
                    },
                ],
                errors: [
                    {
                        messageId: "externalURL",
                    }
                ]
            },
            {
                code:`
<link href="https://fonts.googleapis.com/css?family=Test" rel="stylesheet"></link>
`,
                options: [
                    {
                        ignoreDomains: [ "foo.com" ],
                    },
                ],
                errors: [
                    {
                        messageId: "externalURL",
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
                        messageId: "externalURL",
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
                        messageId: "externalURL",
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
