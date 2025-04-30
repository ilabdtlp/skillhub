export default function CheckoutFormComponent() {
  return (
    <form className="flex w-full max-w-md flex-col gap-2 p-8 sm:mt-4 sm:rounded-lg sm:shadow-lg">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Select your name</legend>

        <select defaultValue="" className="select w-full">
          <option value="">Select</option>
          <option value="john">John Doe</option>
          <option value="alex">Alex King</option>
        </select>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Rate your experience</legend>

        <div className="rating">
          <input
            type="radio"
            name="rating"
            className="mask mask-star"
            aria-label="1 star"
            value={1}
          />
          <input
            type="radio"
            name="rating"
            className="mask mask-star"
            aria-label="2 star"
            value={2}
          />
          <input
            type="radio"
            name="rating"
            className="mask mask-star"
            aria-label="3 star"
            value={3}
          />
          <input
            type="radio"
            name="rating"
            className="mask mask-star"
            aria-label="4 star"
            value={4}
          />
          <input
            type="radio"
            name="rating"
            className="mask mask-star"
            aria-label="5 star"
            value={5}
          />
        </div>

        <p className="label overflow-clip">
          This rating is for the Skill Hub experience,
          <br />
          not for the program you attended.
        </p>
      </fieldset>

      <button type="submit" className="btn btn-primary btn-block mt-4">
        Check Out
      </button>
    </form>
  );
}
