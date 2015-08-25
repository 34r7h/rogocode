/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('admin', () => {
  let scope
    , element;

  beforeEach(module('rogocode', '/admin-directive.tpl.html'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope.$new();
    element = $compile(angular.element('<admin></admin>'))(scope);
  }));

  it('should have correct text', () => {
    scope.$apply();
    expect(element.isolateScope().admin.name).toEqual('admin');
  });
});
