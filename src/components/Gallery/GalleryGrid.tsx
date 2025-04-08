
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Sample gallery data
const galleryImages = [
  {
    id: 1,
    category: "chess",
    src: "/lovable-uploads/chess2.webp",
    alt: "Chess Tournament",
    description: "Annual chess tournament organized by MEA"
  },
  {
    id: 2,
    category: "trip",
    src: "/lovable-uploads/deptrip.jpg",
    alt: "Department Trip",
    description: "Mechanical Department trip to nearby hills"
  },
  {
    id: 3,
    category: "sports",
    src: "/lovable-uploads/chess.webp",
    alt: "Sports Event",
    description: "Inter-department sports competition"
  },
  {
    id: 4,
    category: "workshop",
    src: "/lovable-uploads/cadclash.png",
    alt: "Technical Workshop",
    description: "CAD modeling workshop for students"
  },
  {
    id: 5,
    category: "chess",
    src: "/lovable-uploads/chess1.webp",
    alt: "Chess Tournament Winners",
    description: "Winners of the annual chess tournament"
  },
  {
    id: 6,
    category: "trip",
    src: "/lovable-uploads/grpphoto.jpg",
    alt: "Group Photo",
    description: "Group photo at the department trip"
  },
  {
    id: 7,
    category: "sports",
    src: "/lovable-uploads/football2.webp",
    alt: "Football Match",
    description: "Inter-department football match"
  },
  {
    id: 8,
    category: "workshop",
    src: "/lovable-uploads/cadclash.png",
    alt: "Robotics Workshop",
    description: "Robotics workshop for mechanical students"
  }
];

const GalleryGrid = () => {
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [open, setOpen] = useState(false);

  const categories = [
    { id: "all", name: "All" },
    { id: "chess", name: "Chess" },
    { id: "trip", name: "Trips" },
    { id: "sports", name: "Sports" },
    { id: "workshop", name: "Workshops" }
  ];

  const filteredImages = filter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const handleImageClick = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    setOpen(true);
  };

  return (
    <div>
      {/* Gallery Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === category.id 
                ? 'bg-mea-gold text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map(image => (
          <div 
            key={image.id} 
            className="relative overflow-hidden rounded-lg aspect-square cursor-pointer"
            onClick={() => handleImageClick(image)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h4 className="text-white font-medium">{image.alt}</h4>
              <p className="text-gray-200 text-sm">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
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
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryGrid;
