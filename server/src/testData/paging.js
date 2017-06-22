const paging = [{
        title: 'hello',
        number: 1
    },
    {
        title: 'hello',
        number: 2
    },
    {
        title: 'hello',
        number: 3
    }
];

let getData = function (count) {
    let paging = []
    for (let i = 0; i < count; i++) {
        let num = i + 1
        paging.push(getItem(num))
    }
    return paging
}

let getItem = function (i) {
    return {
        title: 'hello',
        number: i
    }
}

module.exports = {
    paging: getData(40)
}
