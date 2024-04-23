export default function MenuItem() {
  return (
    <div className="bg-gray-200 p-6 rounded-lg text-center hover:bg-white transition-all hover:shadow-lg hover:shadow-black/25">
      <div className="text-center">
        <img
          src="/pizza.png"
          className="max-h-auto max-h-32 block mx-auto"
          alt="pizza"
        />
      </div>
      <h4 className="font-semibold text-xl my-3">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit
      </p>
      <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
        Add to cart $12
      </button>
    </div>
  );
}
