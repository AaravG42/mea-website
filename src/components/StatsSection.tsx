
const statsData = [
  { value: "1400+", label: "Students" },
  { value: "60", label: "Faculty" },
  { value: "57", label: "Global Department Rank" },
  { value: "1", label: "MEA" }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-mea-darkblue via-purple/80 to-sky/80 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-mea-gold to-orange bg-clip-text text-transparent mb-2">{stat.value}</div>
              <div className="text-lg font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
