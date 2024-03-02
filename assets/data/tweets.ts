const tweets = [
    {
      id: 't0',
      user: {
        id: 'u1',
        username: 'VadimNotJustDev',
        name: 'Vadim',
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
      },
      createdAt: '2020-08-27T12:00:00.000Z',
      content: 'Can you please check if the Subscribe button on Youtube works?',
      description: 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/thumbnail.png',
      numberOfComments: 123,
      numberOfRetweets: 11,
      numberOfLikes: 10,
      comments: ['c0','c1', 'c11']
    },
    {
      id: '111111111',
      createdAt: '2023-04-28T08:30:00.000Z',
      user: {
        id: '123456789',
        name: 'Jeff B',
        username: 'bezos',
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg',
      },
      content:
        'Just had a great workout at the gym! 💪 #fitness #healthylifestyle',
        description: 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
      numberOfComments: 2,
      numberOfRetweets: 5,
      numberOfLikes: 25,
      impressions: 500,
    },
    {
      id: '222222222',
      createdAt: '2023-04-27T19:45:00.000Z',
      user: {
        id: '987654321',
        name: 'Zuck',
        username: 'zuck',
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg',
      },
      content: 'Had an amazing surf session this morning',
      description: 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
      image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/8.jpg',
      numberOfComments: 10,
      numberOfRetweets: 20,
      numberOfLikes: 100,
      impressions: 1000,
    },
    {
      id: '333333333',
      createdAt: '2023-04-26T12:00:00.000Z',
      user: {
        id: '123456789',
        name: 'Jane Smith',
        username: 'janesmith',
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/6.png',
      },
      content:
        'Excited to announce that I will be speaking at the upcoming tech conference in San Francisco! 🎉 #womenintech',
        description: 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
      numberOfComments: 5,
      numberOfRetweets: 10,
      numberOfLikes: 50,
      impressions: 1000,
    },
    {
      id: 't1',
      user: {
        id: 'u1',
        username: 'VadimNotJustDev',
        name: 'Vadim',
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
      },
      createdAt: '2020-08-27T12:00:00.000Z',
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    description: 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
      image:
        'https://i.insider.com/5d03aa8e6fc9201bc7002b43?width=1136&format=jpeg',
      numberOfComments: 123,
      numberOfRetweets: 11,
      numberOfLikes: 10,
    },
    {
      id: 't2',
      user: {
        id: 'u1',
        username: 'VadimNotJustDev',
        name: 'Vadim',
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
      },
      createdAt: '2020-08-27T12:00:00.000Z',
      content:
        "Hey Hey Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      numberOfComments: 4,
      numberOfRetweets: 11,
      numberOfLikes: 99,
    },
    {
      id: 't3',
      user: {
        id: 'u1',
        username: 'VadimNotJustDev',
        name: 'Vadim',
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
      },
      createdAt: '2020-08-27T12:00:00.000Z',
      content: 'Hello World',
      numberOfComments: 4,
      numberOfRetweets: 11,
      numberOfLikes: 99,
    },
    {
      id: 't4',
      user: {
        id: 'u1',
        username: 'VadimNotJustDev',
        name: 'Vadim',
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
      },
      createdAt: '2020-08-27T12:00:00.000Z',
      content:
        "Hey Hey Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        description: 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',  
    numberOfComments: 4,
      numberOfRetweets: 11,
      numberOfLikes: 99,
    },
  ];
  
  export default tweets;
  