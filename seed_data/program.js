exports.seed = function() {
    return data;
};

var data = [{
    _id: '51e71518ed32080ffc000006',
    name: 'Program numero uno, a Yearly plan',
    rateSheet: {
        termPeriod: 'Year',
        buyoutOptions: [
                { 
                name: '$1.00 Buyout Program', 
                terms: [{length: 1}, {length: 2}, {length: 3}],
                costs: [
                    {
                        min: 1000,
                        max: 2000,
                        rates: [{rate: 0.96}, {rate: 0.80}, {rate: 0.75}]
                    },
                    {
                        min: 2001,
                        max: 10000,
                        rates: [{rate: 0.96}, {rate: 0.80}, {rate: 0.75}]
                    }
                    ]
                },
                { 
                name: '10% Purchase Option', 
                terms: [{length: 1}, {length: 2}, {length: 3}, {length: 4}],
                costs: [
                    {
                        min: 1000,
                        max: 2000,
                        rates: [{rate: 0.96}, {rate: 0.80}, {rate: 0.75}, {rate: 0.75}]
                        
                    }]
                }]
        }
},
{
    _id: '51e71518ed32080ffc000007',
    name: 'Program numero dos, a Yearly plan',
    rateSheet: {
        termPeriod: 'Year',
        buyoutOptions: [
                { 
                name: '$1.00 Buyout Program', 
                terms: [{length: 1}, {length: 2}, {length: 3}],
                costs: [
                    {
                        min: 1000,
                        max: 2000,
                        rates: [{rate: 0.96}, {rate: 0.80}, {rate: 0.75}]
                    },
                    {
                        min: 2001,
                        max: 10000,
                        rates: [{rate: 0.96}, {rate: 0.80}, {rate: 0.75}]
                    }
                    ]
                },
                { 
                name: '10% Purchase Option', 
                terms: [{length: 1}, {length: 2}, {length: 3}, {length: 4}],
                costs: [
                    {
                        min: 1000,
                        max: 2000,
                        rates: [{rate: 0.96}, {rate: 0.80}, {rate: 0.75}, {rate: 0.75}]
                        
                    }]
                }]
        }
},
{
    _id: '51e71518ed32080ffc000050',
    name: 'Program numero tres, a Yearly plan',
    rateSheet: {
        termPeriod: 'Year',
        buyoutOptions: [
                { 
                name: '$1.00 Buyout Program', 
                terms: [{length: 1}, {length: 2}, {length: 3}],
                costs: [
                    {
                        min: 1000,
                        max: 2000,
                        rates: [{rate: 0.96}, {rate: 0.80}, {rate: 0.75}]
                    },
                    {
                        min: 2001,
                        max: 10000,
                        rates: [{rate: 0.96}, {rate: 0.80}, {rate: 0.75}]
                    }
                    ]
                },
                { 
                name: '10% Purchase Option', 
                terms: [{length: 1}, {length: 2}, {length: 3}, {length: 4}],
                costs: [
                    {
                        min: 1000,
                        max: 2000,
                        rates: [{rate: 0.96}, {rate: 0.80}, {rate: 0.75}, {rate: 0.75}]
                        
                    }]
                }]
        }
},
{
    _id: '51e71518ed32080ffc000051',
    name: 'Program numero quatro, a Yearly plan',
    rateSheet: {
        termPeriod: 'Year',
        buyoutOptions: [
                { 
                name: '$1.00 Buyout Program', 
                terms: [{length: 1}, {length: 2}, {length: 3}],
                costs: [
                    {
                        min: 1000,
                        max: 2000,
                        rates: [{rate: 0.96}, {rate: 0.80}, {rate: 0.75}]
                    },
                    {
                        min: 2001,
                        max: 10000,
                        rates: [{rate: 0.96}, {rate: 0.80}, {rate: 0.75}]
                    }
                    ]
                },
                { 
                name: '10% Purchase Option', 
                terms: [{length: 1}, {length: 2}, {length: 3}, {length: 4}],
                costs: [
                    {
                        min: 1000,
                        max: 2000,
                        rates: [{rate: 0.96}, {rate: 0.80}, {rate: 0.75}, {rate: 0.75}]
                        
                    }]
                }]
        }
}];