const singleClass = [
  { name: "Mat Class", price: "$25", detail: "Drop-in · 15 spots · 50 min" },
  { name: "Apparatus Class", price: "$45", detail: "Per class · 3 spots · 50 min" },
  { name: "Private Session", price: "$110", detail: "By appointment · 50 min" },
  { name: "Duet Session", price: "$60", detail: "Per person · By appointment" },
];

const courses = [
  { name: "Return to Life Course I", price: "$160", detail: "8-week beginner series" },
  { name: "Return to Life Course II", price: "$160", detail: "8-week intermediate series" },
];

export default function PricingComparison() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Single Class Rates */}
      <div className="mb-12">
        <h3 className="font-serif text-xl font-light text-charcoal mb-6 text-center">
          Single Class Rates
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {singleClass.map((item) => (
            <div key={item.name} className="bg-white border border-charcoal/10 rounded-sm p-5 text-center">
              <p className="font-serif text-2xl font-light text-charcoal mb-1">{item.price}</p>
              <p className="font-serif text-sm text-charcoal mb-0.5">{item.name}</p>
              <p className="text-[11px] text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Courses */}
      <div>
        <h3 className="font-serif text-xl font-light text-charcoal mb-6 text-center">
          Course Series
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course.name} className="bg-white border border-charcoal/10 rounded-sm p-5 text-center">
              <p className="font-serif text-sm text-charcoal mb-1">{course.name}</p>
              <p className="font-serif text-2xl font-light text-charcoal mb-0.5">{course.price}</p>
              <p className="text-[11px] text-muted">{course.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
