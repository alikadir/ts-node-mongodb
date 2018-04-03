[
  '{{repeat(10)}}',
  {
    _id: '{{objectId()}}',
    index: '{{index()}}',
    guid: '{{guid()}}',
    isActive: '{{bool()}}',
    balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
    picture: 'https://picsum.photos/200/300/?random',
    age: '{{integer(20, 40)}}',
    eyeColor: '{{random("blue", "brown", "green")}}',
    name: '{{firstName()}} {{surname()}}',
    gender: '{{gender()}}',
    company: '{{company().toUpperCase()}}',
    email: '{{email()}}',
    phone: '+90 {{phone()}}',
    address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    about: '{{lorem(1, "paragraphs")}}',
    registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    latitude: '{{floating(-90.000001, 90)}}',
    longitude: '{{floating(-180.000001, 180)}}',
    tags: [
      '{{repeat(0,10)}}',
      '{{lorem(1, "words")}}'
    ],
    ranges:[
     '{{repeat(0,10)}}',
     '{{integer(0, 999)}}',
    ],
    friends: [
      '{{repeat(0,5)}}',
      {
        id: '{{index()}}',
        name: '{{firstName()}} {{surname()}}',
        age: '{{integer(20, 40)}}',
        rules:[
        '{{repeat(0,5)}}',
          {
            name:'{{lorem(1, "words")}}',
            level:'{{integer(0, 10)}}'
          }
        ]
      }
    ],
    greeting: function (tags) {
      return 'Hello, ' + this.name + '! You have ' + tags.integer(1, 10) + ' unread messages.';
    },
    favoriteFruit: function (tags) {
      var fruits = ['apple', 'banana', 'strawberry'];
      return fruits[tags.integer(0, fruits.length - 1)];
    }
  }
]