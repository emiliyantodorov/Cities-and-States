const list = document.querySelector(".suggestions");

const endpointURL = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const handleError = (response) => {
    if (response.ok) return response
    throw Error;
}

const fetchData = (url) => {
    return fetch(url)
        .then(handleError)
        .then(response => response.json())
        .catch(error => console.log(error))
}

const allCities = fetchData(endpointURL);

const filterCities = (data, filterWord) => {
    return data
        .filter(curObj => curObj.city.includes(filterWord) || curObj.state.includes(filterWord));
}

const markedMatchedValue = (value, wholeWord) => {
    if (wholeWord.includes(value)) {
        return wholeWord.replace(value, `<span class="hl">${value}</span>`)
    }                                                                      else {
        return wholeWord
    }
}

const searchHandler = (evt) => {
    // 1. Get input value
    const inputVal = evt.target.value;
    console.log(inputVal)
    // 2. Clear list
    list.innerHTML = "";
    // 3. Add filtered cities to the list and display the list
    if (inputVal.trim() !== "") {
        allCities
            .then(data => {
                const fragment = document.createDocumentFragment();

                filterCities(data, inputVal)
                    .map(curObj => {
                        const newLi = document.createElement("li");
                        newLi.innerHTML = `<span class="name">${markedMatchedValue(inputVal,curObj.city)}, ${markedMatchedValue(inputVal,curObj.state)}</span><span class="population">${curObj.population}</span>`

                        return newLi
                    })
                    .forEach(li => {
                        fragment.appendChild(li);
                    })

                list.appendChild(fragment)
            })
    }
}

// events
document.querySelector(".search").addEventListener("keyup", searchHandler)