const customers = [
  {
    username: 'Kyaw Kyaw',
    email: 'kyawkyaw@gmail.com',
    password: 'kyawkyaw@vote',
  },
  {
    username: 'Maw Maw',
    email: 'mawmaw@gmail.com',
    password: 'mawmaw@vote',
  },
  {
    username: 'Aye Aye',
    email: 'ayeaye@gmail.com',
    password: 'ayaye@vote',
  },
  {
    username: 'Sakura',
    email: 'sakura@gmail.com',
    password: 'sakura@vote',
  },
  {
    username: 'Mike',
    email: 'mike@gmail.com',
    password: 'mike@vote',
  },
]

const admin = {
  username: 'admin',
  email: 'admin@voter.com',
  password: 'admin@vote#123',
  phone: '0912345',
}

const paymentMethods = [
  {
    name: 'Kpay',
    phone: '0912345',
    accountNumber: null,
  },
  {
    name: 'KBZ Bank',
    phone: null,
    accountNumber: '0101020203030404',
  },
  {
    name: 'AYA Pay',
    phone: '09123456',
    accountNumber: null,
  },
  {
    name: 'CB Bank',
    phone: null,
    accountNumber: '0202030304040505',
  },
]

const pricings = [
  {
    pointCount: 10,
    amount: 100,
  },
  {
    pointCount: 100,
    amount: 1000,
  },
  {
    pointCount: 1000,
    amount: 10000,
  },
  {
    pointCount: 10000,
    amount: 100000,
  },
]

const topics = [
  {
    name: 'Myanmar Idol Season (3) Grand Final',
    description:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
    pointPerVote: 100,
    fromDate: '2023-12-01 00:00:00',
    toDate: '2023-12-08 00:00:00',
    status: 'active',
  },
  {
    name: 'Myanmar Idol Season (1) Grand Final',
    description:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
    pointPerVote: 100,
    fromDate: '2023-12-01 00:00:00',
    toDate: '2023-12-08 00:00:00',
    status: 'coming-soon',
  },
  {
    name: 'Myanmar Idol Season (4) Grand Final',
    description:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
    pointPerVote: 100,
    fromDate: '2023-12-01 00:00:00',
    toDate: '2023-12-08 00:00:00',
    status: 'active',
  },
]

const contestants = [
  {
    name: 'Justin',
    description:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
    topics_id: 'acc872f9-06c7-435c-b036-7fbf4b079961',
    image_name: 'justin-acc872f9-06c7-435c-b036-7fbf4b079961.png',
  },
  {
    name: 'Nike',
    description:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
    topics_id: 'acc872f9-06c7-435c-b036-7fbf4b079961',
    image_name: 'nike-acc872f9-06c7-435c-b036-7fbf4b079961.png',
  },
  {
    name: 'Taylor',
    description:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...',
    topics_id: 'acc872f9-06c7-435c-b036-7fbf4b079961',
    image_name: 'taylor-acc872f9-06c7-435c-b036-7fbf4b079961.png',
  },
]

module.exports = {
  customers,
  admin,
  paymentMethods,
  pricings,
  topics,
  contestants,
}
