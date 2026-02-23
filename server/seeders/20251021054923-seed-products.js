"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Products", [
      {
        name: "Ergonomic Comfort Chair Model 3000",
        price: 249.99,
        description:
          "Experience unparalleled comfort with the Ergonomic Comfort Chair Model 3000. Designed for long hours at the office, this chair features adjustable lumbar support, breathable mesh fabric, and a 360-degree swivel base. Perfect for enhancing productivity while ensuring your comfort throughout the workday.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Executive Luxe Chair Model 5000",
        price: 349.99,
        description:
          "Elevate your office space with the Executive Luxe Chair Model 5000. Crafted with premium leather and high-density foam, this chair provides a sophisticated look that complements any professional setting. With its reclining feature and adjustable armrests, it's designed to adapt to your needs, ensuring a luxurious seating experience.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Modern Workspace Desk Model 7000",
        price: 499.99,
        description:
          "The Modern Workspace Desk Model 7000 brings style and functionality to your office. Featuring a sleek design with a durable surface, this desk offers ample workspace and built-in cable management solutions to keep your area tidy. It's the perfect blend of modern aesthetics and practicality for any professional environment.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Versatile Storage Shelf Model V100",
        price: 129.99,
        description:
          "Maximize your storage with the Versatile Storage Shelf Model V100. This sturdy shelf is perfect for organizing books, files, or decorative items. Its open design allows for easy access while adding a touch of elegance to your office space, making it ideal for both functionality and style.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Contemporary Wall Shelf Model W200",
        price: 89.99,
        description:
          "Enhance your wall space with the Contemporary Wall Shelf Model W200. This minimalist shelf is designed to display your favorite items or keep essentials within reach. Made from high-quality materials, it is both durable and aesthetically pleasing, elevating the look of your office or home.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Multi-tier Organizer Shelf Model M300",
        price: 159.99,
        description:
          "The Multi-tier Organizer Shelf Model M300 offers a stylish solution for your storage needs. With multiple levels, this shelf allows you to showcase books, plants, or decorative pieces in a visually appealing way. Its modern design and robust construction make it a fantastic addition to any office or living space.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
