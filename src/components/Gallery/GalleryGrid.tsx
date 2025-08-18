
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { mclImages } from "./mclImages";
import { badmintonImages } from "./badmintonImages";
import { damanImages } from "./damanImages";

const baseImages = [
  {
    id: 1,
    category: "chess",
    year: "2024-25",
    src: "/lovable-uploads/chess2.webp",
    alt: "Chess Tournament",
    description: "Annual chess tournament organized by MEA"
  },
  {
    id: 2,
    category: "trip",
    year: "2023-24",
    src: "/lovable-uploads/deptrip.jpg",
    alt: "Department Trip",
    description: "Mechanical Department trip to nearby hills"
  },
  {
    id: 3,
    category: "sports",
    year: "2023-24",
    src: "/lovable-uploads/chess.webp",
    alt: "Sports Event",
    description: "Inter-department sports competition"
  },
  {
    id: 5,
    category: "chess",
    year: "2023-24",
    src: "/lovable-uploads/chess1.webp",
    alt: "Chess Tournament Winners",
    description: "Winners of the annual chess tournament"
  },
  {
    id: 6,
    category: "trip",
    year: "2023-24",
    src: "/lovable-uploads/grpphoto.jpg",
    alt: "Group Photo",
    description: "Group photo at the department trip"
  },
  {
    id: 7,
    category: "sports",
    year: "2023-24",
    src: "/lovable-uploads/football2.webp",
    alt: "Football Match",
    description: "Inter-department football match"
  }
];

const mclImagesWithAdjustedIds = mclImages.map((img, index) => ({
  ...img,
  id: 9 + index
}));

const badmintonImagesWithAdjustedIds = badmintonImages.map((img, index) => ({
  ...img,
  id: 9 + mclImages.length + index
}));

const damanImagesWithAdjustedIds = damanImages.map((img, index) => ({
  ...img,
  id: 9 + mclImages.length + badmintonImages.length + index
}));

const galleryImages = [...baseImages, ...mclImagesWithAdjustedIds, ...badmintonImagesWithAdjustedIds, ...damanImagesWithAdjustedIds];

const GalleryGrid = () => {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  const [clickedYear, setClickedYear] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [open, setOpen] = useState(false);

  const years = ["all", "2023-24", "2024-25", "2025-26"];
  const categories = [
    { id: "all", name: "All" },
    { id: "chess", name: "Chess" },
    { id: "trip", name: "Trips" },
    // { id: "sports", name: "Sports" },
    {id: "badminton", name: "Badminton"},
    { id: "cricket", name: "Cricket" },
    { id: "workshop", name: "Workshops" }
  ];

  const filteredImages = galleryImages.filter(img => {
    const yearMatch = selectedYear === "all" || img.year === selectedYear;
    const categoryMatch = selectedCategory === "all" || img.category === selectedCategory;
    return yearMatch && categoryMatch;
  });

  const handleImageClick = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleYearClick = (year: string) => {
    setSelectedYear(year);
    setSelectedCategory("all");
    if (year === "all") {
      setClickedYear(null);
    } else {
      setClickedYear(clickedYear === year ? null : year);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setClickedYear(null);
  };

  const shouldShowDropdown = (year: string) => {
    return year !== "all" && (hoveredYear === year || clickedYear === year);
  };

  return (
    <div>
      <style>
        {`
          @keyframes dropdownSlideIn {
            from {
              opacity: 0;
              transform: translateY(-8px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes dropdownSlideOut {
            from {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            to {
              opacity: 0;
              transform: translateY(-8px) scale(0.95);
            }
          }
          
          .dropdown-enter {
            animation: dropdownSlideIn 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          
          .dropdown-exit {
            animation: dropdownSlideOut 0.15s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
        `}
      </style>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {years.map(year => (
          <div
            key={year}
            className="relative"
            onMouseEnter={() => setHoveredYear(year)}
            onMouseLeave={() => setHoveredYear(null)}
          >
            <button
              onClick={() => handleYearClick(year)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 ${
                selectedYear === year 
                  ? 'bg-mea-gold text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              {year === "all" ? "All Years" : year}
            </button>
            
            {shouldShowDropdown(year) && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-10 min-w-[150px] dropdown-enter">
                <div className="py-1">
                  {categories.slice(1).map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`w-full text-left px-3 py-2 text-sm transition-all duration-150 ease-out transform hover:scale-[1.02] hover:bg-gray-50 ${
                        selectedCategory === category.id 
                          ? 'bg-mea-gold text-white shadow-sm' 
                          : 'text-gray-700'
                      }`}
                      style={{
                        animationDelay: `${index * 30}ms`
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedCategory !== "all" && (
        <div className="flex justify-center mb-4">
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full transition-all duration-200 ease-out transform hover:scale-105">
            Showing {selectedCategory} from {selectedYear === "all" ? "all years" : selectedYear}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map(image => (
          <div 
            key={image.id} 
            className="relative overflow-hidden rounded-lg aspect-square cursor-pointer group"
            onClick={() => handleImageClick(image)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h4 className="text-white font-medium">{image.alt}</h4>
              <p className="text-gray-200 text-sm">{image.description}</p>
              <p className="text-gray-300 text-xs mt-1">{image.year}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-black">
          {selectedImage && (
            <div>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
                <h3 className="text-white text-lg font-medium">{selectedImage.alt}</h3>
                <p className="text-gray-300">{selectedImage.description}</p>
                <p className="text-gray-400 text-sm mt-1">{selectedImage.year}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryGrid;
