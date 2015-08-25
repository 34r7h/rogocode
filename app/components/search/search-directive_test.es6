/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('search', () => {
  let scope
    , element;

  beforeEach(module('rogocode', '/search-directive.tpl.html'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope.$new();
    element = $compile(angular.element('<search></search>'))(scope);
  }));

  it('should have correct text', () => {
    scope.$apply();
    expect(element.isolateScope().search.name).toEqual('search');
  });
});
