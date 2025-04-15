import React, { useState } from "react";
import Slider from "react-slick";

const photographyTypes = [
  { title: "Wedding", imageUrl: "/categories/wedding.png" },
  { title: "Family", imageUrl: "/categories/family.png" },
  { title: "Portrait", imageUrl: "/categories/portraite.png" },
  { title: "Children", imageUrl: "/categories/kids.png" },
  { title: "Business", imageUrl: "/categories/Business.png" },
  { title: "Fashion", imageUrl: "/categories/fashion.png" },
  { title: "Product", imageUrl: "/categories/product.png" },
];

const PhotographyCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const settings = {
    infinite: true,
    centerMode: true,
    centerPadding: "20px",
    slidesToShow: 3,
    speed: 500,
    focusOnSelect: true,
    arrows: false,
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-4 overflow-visible">
      <Slider {...settings}>
        {photographyTypes.map((item) => {
          const isSelected = selectedCategory === item.title;
          return (
            <div
              key={item.title}
              className="px-2"
              onClick={() => setSelectedCategory(item.title)}
            >
              <div
                className={`
                  relative bg-white shadow-md rounded-lg transition-all duration-300 transform cursor-pointer
                  ${
                    isSelected
                      ? "ring-4 ring-sky-400 scale-100 z-10"
                      : "hover:scale-105"
                  }
                `}
                style={{ overflow: "visible" }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-[200px] object-cover rounded-t-lg"
                />
                <div className="text-center p-2 text-sm font-medium">
                  {item.title}
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default PhotographyCategory;
