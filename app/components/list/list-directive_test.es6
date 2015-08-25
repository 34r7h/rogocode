/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('list', () => {
  let scope
    , element;

  beforeEach(module('rogocode', '/list-directive.tpl.html'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope.$new();
    element = $compile(angular.element('<list></list>'))(scope);
  }));

  it('should have correct text', () => {
    scope.$apply();
    expect(element.isolateScope().list.name).toEqual('list');
  });
});
