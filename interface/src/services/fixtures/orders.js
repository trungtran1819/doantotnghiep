const orders = [
  {
    customer: {
      name: 'Trần Văn A',
      phone: '123543453',
      email: 'tranvana@gmail.com',
      address: 'Số 1, Phố 2, TP.HCM',
    },
    items: [
      {
        name: 'Sushi Nigiri',
        quantity: 2,
      },
      {
        name: 'Sake Junmai',
        quantity: 1,
      }
    ],
    status: 'Chờ xử lý',
    created: '27/07/2023 10:30',
  },
  {
    customer: {
      name: 'Nguyễn Thị B',
      phone: '234567890',
      email: 'nguyenthib@gmail.com',
      address: 'Số 2, Phố 3, Hà Nội',
    },
    items: [
      {
        name: 'Sushi Maki',
        quantity: 3,
      },
      {
        name: 'Sake Daiginjo',
        quantity: 1,
      }
    ],
    status: 'Đang giao',
    created: '28/07/2023 11:30',
  },
  {
    customer: {
      name: 'Phạm Văn C',
      phone: '345678901',
      email: 'phamvanc@gmail.com',
      address: 'Số 3, Phố 4, Đà Nẵng',
    },
    items: [
      {
        name: 'Sushi California',
        quantity: 1,
      },
      {
        name: 'Sake Honjozo',
        quantity: 2,
      }
    ],
    status: 'Hoàn thành',
    created: '29/07/2023 12:30',
  },
  {
    customer: {
      name: 'Lê Thị D',
      phone: '456789012',
      email: 'lethid@gmail.com',
      address: 'Số 4, Phố 5, Cần Thơ',
    },
    items: [
      {
        name: 'Sushi Temaki',
        quantity: 4,
      },
      {
        name: 'Sake Nigori',
        quantity: 1,
      }
    ],
    status: 'Chờ xử lý',
    created: '30/07/2023 13:30',
  },
  {
    customer: {
      name: 'Nguyễn Văn E',
      phone: '567890123',
      email: 'nguyenvane@gmail.com',
      address: 'Số 5, Phố 6, Bình Dương',
    },
    items: [
      {
        name: 'Sushi Sashimi',
        quantity: 2,
      },
      {
        name: 'Sake Ginjo',
        quantity: 3,
      }
    ],
    status: 'Đang giao',
    created: '31/07/2023 14:30',
  },
  {
  customer: {
    name: 'Lê Thị D',
    phone: '456789012',
    email: 'lethid@gmail.com',
    address: 'Số 4, Phố 5, Cần Thơ',
  },
  items: [
    {
      name: 'Sushi Temaki',
      quantity: 4,
    },
    {
      name: 'Sake Nigori',
      quantity: 1,
    }
  ],
  status: 'Chờ xử lý',
  created: '30/07/2023 13:30',
},
{
  customer: {
    name: 'Nguyễn Văn E',
    phone: '567890123',
    email: 'nguyenvane@gmail.com',
    address: 'Số 5, Phố 6, Bình Dương',
  },
  items: [
    {
      name: 'Sushi Sashimi',
      quantity: 2,
    },
    {
      name: 'Sake Ginjo',
      quantity: 3,
    }
  ],
  status: 'Đang giao',
  created: '31/07/2023 14:30',
},
{
  customer: {
    name: 'Đỗ Văn F',
    phone: '678901234',
    email: 'dovanf@gmail.com',
    address: 'Số 6, Phố 7, Hải Phòng',
  },
  items: [
    {
      name: 'Sushi Uramaki',
      quantity: 2,
    },
    {
      name: 'Sake Yamahai',
      quantity: 1,
    }
  ],
  status: 'Hoàn thành',
  created: '01/08/2023 15:30',
},
{
  customer: {
    name: 'Trần Thị G',
    phone: '789012345',
    email: 'tranthig@gmail.com',
    address: 'Số 7, Phố 8, Nha Trang',
  },
  items: [
    {
      name: 'Sushi Futomaki',
      quantity: 3,
    },
    {
      name: 'Sake Kimoto',
      quantity: 2,
    }
  ],
  status: 'Chờ xử lý',
  created: '02/08/2023 16:30',
},
{
  customer: {
    name: 'Lê Văn H',
    phone: '890123456',
    email: 'levanh@gmail.com',
    address: 'Số 8, Phố 9, Đà Lạt',
  },
  items: [
    {
      name: 'Sushi California',
      quantity: 4,
    },
    {
      name: 'Sake Honjozo',
      quantity: 1,
    }
  ],
  status: 'Đang giao',
  created: '03/08/2023 17:30',
},
//...
{
  customer: {
    name: 'Lê Thị D',
    phone: '456789012',
    email: 'lethid@gmail.com',
    address: 'Số 4, Phố 5, Cần Thơ',
  },
  items: [
    {
      name: 'Sushi Temaki',
      quantity: 4,
    },
    {
      name: 'Sake Nigori',
      quantity: 1,
    }
  ],
  status: 'Chờ xử lý',
  created: '30/07/2023 13:30',
},
{
  customer: {
    name: 'Nguyễn Văn E',
    phone: '567890123',
    email: 'nguyenvane@gmail.com',
    address: 'Số 5, Phố 6, Bình Dương',
  },
  items: [
    {
      name: 'Sushi Sashimi',
      quantity: 2,
    },
    {
      name: 'Sake Ginjo',
      quantity: 3,
    }
  ],
  status: 'Đang giao',
  created: '31/07/2023 14:30',
},

];

export default orders;