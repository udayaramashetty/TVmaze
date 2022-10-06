import React, { useState, useEffect } from "react";

function Actor() {
  const [inputVal, setInputVal] = useState("");
  const [actorsData, setActorsData] = useState([]);

  let dataUrl = "";
  if (inputVal.length > 0) {
    dataUrl = `https://api.tvmaze.com/search/people?q=${inputVal}`;
  } else {
    dataUrl = `https://api.tvmaze.com/search/people?q=game`;
  }

  const getActorsData = async () => {
    try {
      let respone = await fetch(dataUrl);
      let resData = await respone.json();
      setActorsData(resData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getActorsData();
  }, [inputVal]);
  // console.log(actorsData);
  return (
    <>
      <section className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="form-control"
                placeholder="Search by Actors name...."
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mt-4">
          <div className="row">
            {actorsData.map((element) => {
              return (
                <div className="col-md-4 mb-3">
                  <div className="card">
                    {element.person.image ? (
                      <img
                        src={element.person.image.medium}
                        class="poster"
                        alt={
                          element.person.name != null
                            ? element.person.name
                            : "Not found"
                        }
                      />
                    ) : (
                      <div className="poster" style={{ height: "325px" }}>
                        <img
                          src="https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"
                          style={{ width: "230px", height: "325px" }}
                        />
                      </div>
                    )}
                    <div className="card-body">
                      <p
                        className="card-text overflow-hidden"
                        style={{ height: "90px" }}
                      >
                        Outstanding performence of the Actor 
                      </p>
                    </div>
                    <h5 className="text-danger text-center">
                      {element.person.name}
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Actor;