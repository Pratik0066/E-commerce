import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import { faker } from '@faker-js/faker';
import User from './models/userModel.js';
import Product from './models/Product.js'; // Ensure this matches your filename
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing data to avoid mixing old samples with new data
    await Product.deleteMany();

    const adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      console.log('Error: No Admin user found. Please create one first!'.red.bold);
      process.exit(1);
    }

    const products = [];
    
    // Categories and Brands common in India for an Electronics store
    const categories = ['Laptops', 'Smartphones', 'Headphones', 'Cameras', 'Smartwatches'];
    const brands = ['Samsung', 'Apple', 'Sony', 'Dell', 'Asus', 'HP', 'Boat', 'Xiaomi'];

    console.log('Generating 500 products with actual images...'.yellow);

    for (let i = 1; i <= 500; i++) {
      const category = faker.helpers.arrayElement(categories);
      
      products.push({
        user: adminUser._id,
        name: `${faker.commerce.productAdjective()} ${category}`,
        // Using LoremFlickr with "technology" tag and a unique lock for 500 different images
        image: `https://loremflickr.com/640/480/technology,electronics?lock=${i}`,
        brand: faker.helpers.arrayElement(brands),
        category: category,
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 1500, max: 150000, dec: 0 }),
        countInStock: faker.number.int({ min: 0, max: 20 }),
        rating: faker.number.float({ min: 1, max: 5, multipleOf: 0.1 }),
        numReviews: faker.number.int({ min: 0, max: 100 }),
      });
    }

    await Product.insertMany(products);

    console.log('500 Products Imported Successfully!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}