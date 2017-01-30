'use strict';
app
.config(function($mdThemingProvider) {
  var customBlueMap = 		$mdThemingProvider.extendPalette('blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('green');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
})
