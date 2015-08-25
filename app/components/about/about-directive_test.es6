/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('about', () => {
  let scope
    , element;

  beforeEach(module('rogocode', '/about-directive.tpl.html'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope.$new();
    element = $compile(angular.element('<about></about>'))(scope);
  }));

  it('should have correct text', () => {
    scope.$apply();
    expect(element.isolateScope().about.name).toEqual('about');
  });
});
