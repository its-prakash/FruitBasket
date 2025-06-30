import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apple = "../../../../assets/images/fruit-list-img/apple.png";
  banana = "../../../../assets/images/fruit-list-img/banana.jpg";
  cherry = "../../../../assets/images/fruit-list-img/cherry.jpg";
  dragonFruit = "../../../../assets/images/fruit-list-img/dragon-fruit.jpg";
  kiwi = "../../../../assets/images/fruit-list-img/kiwi.jpg";
  orange = "../../../../assets/images/fruit-list-img/orange.jpg";
  pear = "../../../../assets/images/fruit-list-img/pear.jpg";
  strawary = "../../../../assets/images/fruit-list-img/strawary.png";

  fruitArray: any[] = [
    {
    path: "../../../../assets/images/fruit-list-img/apple.png",
    name: "Apple",
    price: "50 /kg",
    description: "Apples are rich in fiber, vitamins, and antioxidants, supporting digestive health and immune function"
  },
  {
    path: "../../../../assets/images/fruit-list-img/banana.jpg",
    name: "Banana",
    price: "30 /kg",
    description: "Bananas are rich in potassium, vitamins, and minerals, supporting heart health and energy production"
  },
  {
    path: "./assets/images/fruit-list-img/cherry.jpg",
    name: "Cherry",
    price: "80 /kg",
    description: "Cherries are rich in antioxidants, vitamins, and minerals, supporting anti-inflammatory and anti-aging benefits"
  },
  {
    path: "../../../../assets/images/fruit-list-img/dragon-fruit.jpg",
    name: "Dragon Fruit",
    price: "70 /kg",
    description: "Dragon fruits are rich in vitamins, minerals, and antioxidants, supporting immune function and digestive health"
  },
  {
    path: "../../../../assets/images/fruit-list-img/kiwi.jpg",
    name: "Kiwi",
    price: "60 /kg",
    description: "Kiwis are rich in vitamin C, potassium, and fiber, supporting immune function, heart health, and digestion"
  },
  {
    path: "../../../../assets/images/fruit-list-img/orange.jpg",
    name: "Orange",
    price: "40 /kg",
    description: "Oranges are rich in vitamin C, flavonoids, and fiber, supporting immune function, heart health, and digestion"
  },
  {
    path: "../../../../assets/images/fruit-list-img/pear.jpg",
    name: "Pear",
    price: "55 /kg",
    description: "Pears are rich in fiber, vitamins, and antioxidants, supporting digestive health and immune function"
  },
  {
    path: "../../../../assets/images/fruit-list-img/strawary.png",
    name: "Strawberry",
    price: "90 /kg",
    description: "Strawberries are rich in vitamin C, antioxidants, and fiber, supporting heart health, immune function, and anti-aging benefits"
  },
  {
    path: "../../../../assets/images/fruit-list-img/pomegranite.jpg",
    name: "Pomegranate",
    price: "80 /kg",
    description: "Pomegranates are rich in vitamins C and K, potassium, and antioxidants, supporting heart health and immune function"
  },
  {
    path: "../../../../assets/images/fruit-list-img/grapes.jpg",
    name: "Grapes",
    price: "60 /kg",
    description: "Grapes are rich in vitamins C and K, potassium, copper, manganese, and antioxidants like resveratrol"
  },
  {
    path: "../../../../assets/images/fruit-list-img/guava.jpg",
    name: "Guava",
    price: "40 /kg",
    description: "Guavas are rich in vitamin C, antioxidants, and fiber, supporting immune function, digestion, and overall health"
  },
  {
  path: "../../../../assets/images/fruit-list-img/blueberry.jpg",
  name: "Blueberry",
  price: "120 /kg",
  description: "Blueberries are rich in antioxidants, vitamin C, and manganese, supporting brain health, heart health, and anti-aging"
},
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
