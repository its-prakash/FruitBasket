import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fruits-list',
  templateUrl: './fruits-list.component.html',
  styleUrls: ['./fruits-list.component.css']
})
export class FruitsListComponent implements OnInit {

  fruitArray: any[] = [
  {
    path: "./assets/images/fruit-list-img/apple.png",
    name: "Apple",
    price: 50,
    quantity:1,
    description: "Apples are rich in fiber, vitamins, and antioxidants, supporting digestive health and immune function"
  },
  {
    path: "./assets/images/fruit-list-img/banana.jpg",
    name: "Banana",
    price: 30,
    quantity:1,
    description: "Bananas are rich in potassium, vitamins, and minerals, supporting heart health and energy production"
  },
  {
    path: "./assets/images/fruit-list-img/cherry.jpg",
    name: "Cherry",
    price: 80,
    quantity:1,
    description: "Cherries are rich in antioxidants, vitamins, and minerals, supporting anti-inflammatory and anti-aging benefits"
  },
  {
    path: "./assets/images/fruit-list-img/dragon-fruit.jpg",
    name: "Dragon Fruit",
    price: 70,
    quantity:1,
    description: "Dragon fruits are rich in vitamins, minerals, and antioxidants, supporting immune function and digestive health"
  },
  {
    path: "./assets/images/fruit-list-img/kiwi.jpg",
    name: "Kiwi",
    price: 60,
    quantity:1,
    description: "Kiwis are rich in vitamin C, potassium, and fiber, supporting immune function, heart health, and digestion"
  },
  {
    path: "./assets/images/fruit-list-img/orange.jpg",
    name: "Orange",
    price: 40,
    quantity:1,
    description: "Oranges are rich in vitamin C, flavonoids, and fiber, supporting immune function, heart health, and digestion"
  },
  {
    path: "./assets/images/fruit-list-img/pear.jpg",
    name: "Pear",
    price: 55,
    quantity:1,
    description: "Pears are rich in fiber, vitamins, and antioxidants, supporting digestive health and immune function"
  },
  {
    path: "./assets/images/fruit-list-img/strawary.png",
    name: "Strawberry",
    price: 90,
    quantity:1,
    description: "Strawberries are rich in vitamin C, antioxidants, and fiber, supporting heart health, immune function, and anti-aging benefits"
  },
  {
    path: "./assets/images/fruit-list-img/mango.webp",
    name: "Mango",
    price: 100,
    quantity:1,
    description: "Mangoes are rich in vitamins A and C, potassium, and fiber, supporting immune function, eye health, and digestion"
  },
  {
    path: "./assets/images/fruit-list-img/blueberry.jpg",
    name: "Blueberry",
    price: 120,
    quantity:1,
    description: "Blueberries are rich in antioxidants, vitamin C, and manganese, supporting brain health, heart health, and anti-aging"
  },
  {
    path: "./assets/images/fruit-list-img/watermelon.jpg",
    name: "Watermelon",
    price: 35,
    quantity:1,
    description: "Watermelons are rich in water content, vitamins A and C, and lycopene, supporting hydration, heart health, and anti-aging benefits"
  },
  {
    path: "./assets/images/fruit-list-img/pineapple.webp",
    name: "Pineapple",
    price: 65,
    quantity:1,
    description: "Pineapples are rich in vitamin C, manganese, and antioxidants, supporting immune function, heart health, and digestion"
  },
  {
    path: "./assets/images/fruit-list-img/grapes.jpg",
    name: "Grape",
    price: 60,
    quantity:1,
    description: "Grapes are rich in vitamins C and K, potassium, and antioxidants, supporting heart health, immune function, and anti-aging benefits"
  },
  {
    path: "./assets/images/fruit-list-img/guava.jpg",
    name: "Guava",
    price: 40,
    quantity:1,
    description: "Guavas are rich in vitamin C, antioxidants, and fiber, supporting immune function, digestion, and overall health"
  },
];

increseValue(fruit: any) {
  fruit.quantity += 1;
  this.updateCardPrice(fruit);
}

decreseValue(fruit: any) {
  if (fruit.quantity > 1) {
    fruit.quantity -= 1;
    this.updateCardPrice(fruit);
  }
}

updateCardPrice(fruit: any) {}

  constructor() { }

  ngOnInit(): void {
  }

}
