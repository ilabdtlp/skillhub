export default function CheckinFormComponent() {
  return (
    <form className="flex w-full max-w-md flex-col gap-2 p-8 sm:mt-4 sm:rounded-lg sm:shadow-lg">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">What is your name?</legend>
        <input
          required
          type="text"
          className="input w-full"
          placeholder="John Doe"
        />
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Select your age group</legend>

        <select defaultValue="15-25" className="select w-full">
          <option value="below-15">Below 15</option>
          <option value="15-25">15 to 25</option>
          <option value="25-45">25 to 45</option>
          <option value="45-above">45 Above</option>
        </select>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Select your gender</legend>

        <div className="join w-full">
          <input
            className="join-item btn btn-neutral btn-outline flex-1"
            type="radio"
            name="gender"
            value="male"
            aria-label="Male"
          />
          <input
            className="join-item btn btn-neutral btn-outline flex-1"
            type="radio"
            name="gender"
            value="female"
            aria-label="Female"
          />
          <input
            className="join-item btn btn-neutral btn-outline flex-1"
            type="radio"
            name="gender"
            value="other"
            aria-label="Other"
          />
        </div>
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">What is your purpose?</legend>

        <select defaultValue="guest" className="select w-full">
          <option value="guest">Guest</option>
          <option value="staff">Staff</option>
          <option value="dtlp">DTLP</option>
          <option value="clap">CLAP</option>
          <option value="ceem">CEEM</option>
          <option value="other-event">Other Event</option>
        </select>
      </fieldset>

      <button type="submit" className="btn btn-primary btn-block mt-4">
        Check In
      </button>
    </form>
  );
}
