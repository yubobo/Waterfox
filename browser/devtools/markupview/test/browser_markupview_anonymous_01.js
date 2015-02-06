/* vim: set ts=2 et sw=2 tw=80: */
/* Any copyright is dedicated to the Public Domain.
 http://creativecommons.org/publicdomain/zero/1.0/ */

"use strict";

// Test native anonymous content in the markupview.
const TEST_URL = TEST_URL_ROOT + "doc_markup_anonymous.html";

let test = asyncTest(function*() {
  let {inspector} = yield addTab(TEST_URL).then(openInspector);

  let pseudo = yield getNodeFront("#pseudo", inspector);

  // Markup looks like: <div><::before /><span /><::after /></div>
  let children = yield inspector.walker.children(pseudo);
  is (children.nodes.length, 3, "Children returned from walker");

  info ("Checking the ::before pseudo element");
  let before = children.nodes[0];
  yield isEditingMenuDisabled(before, inspector);

  info ("Checking the normal child element");
  let span = children.nodes[1];
  yield isEditingMenuEnabled(span, inspector);

  info ("Checking the ::after pseudo element");
  let after = children.nodes[2];
  yield isEditingMenuDisabled(after, inspector);
});