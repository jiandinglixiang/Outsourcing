module.exports = {
  'presets': [
    ['@vue/app', {
      'useBuiltIns': 'entry'
    }]
  ],
  'plugins': [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk',
        'style': true
      },
      'element-ui'
    ],
    [
      'component',
      {
        'libraryName': 'mint-ui',
        'style': true
      },
      'mint-ui'
    ]
  ]
}
