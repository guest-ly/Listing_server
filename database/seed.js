//mockdata
const faker = require('faker');
const db = require('./index')

var generatedesc = (num) => {
    let obj = {}
    obj.id = num;
    var title = faker.lorem.sentence()
    obj.title =  title.slice(0,title.length-1);
    obj.location = faker.address.city();
    obj.host = {};
        obj.host.name = faker.name.firstName();
        obj.host.pic = faker.image.imageUrl();
    obj.detail = {};
    obj.detail.type = faker.random.arrayElement(['Entire place','Private room','Hotel room','Shared room']);
    var generatedetail = (type) => {
        if(type === 'Entire place'){
            var bedcounter = 0;
            obj.detail.bedrmnum = faker.random.number({min:3, max:6});
            obj.detail.bathrmnum = faker.random.number({min:1, max:obj.detail.bedrmnum});
            obj.detail.guestmax = faker.random.number({min:obj.detail.bedrmnum, max:obj.detail.bedrmnum*2+2});
            var bedoptions = ['1 queen bed','1 single bed','1 king bed','2 single beds']
            var beds = []
            for(var i=0; i<obj.detail.bedrmnum; i++){
                var currBedoption = bedoptions[Math.floor(Math.random()*bedoptions.length)]
                bedcounter += parseInt(currBedoption.slice(0,1))
                beds.push(currBedoption)
            }
            obj.detail.beds = beds;
            obj.detail.bednum = bedcounter;
        } else if (type === 'Private room'){
            obj.detail.bedrmnum = 1;
            obj.detail.bathrmnum = 1;
            obj.detail.guestmax = faker.random.number({min:1, max:3});
            var bedoptions = ['1 queen bed','1 single bed','1 king bed','2 single beds']
            var bedoption = bedoptions[Math.floor(Math.random()*bedoptions.length)]
            obj.detail.beds = [bedoption];
            obj.detail.bednum = parseInt(bedoption.slice(0,1));
        } else if (type === 'Hotel room'){
            var bedcounter = 0;
            obj.detail.bedrmnum = faker.random.number({min:1, max:3});
            obj.detail.bathrmnum = faker.random.number({min:1, max:obj.detail.bedrmnum});
            obj.detail.guestmax = faker.random.number({min:obj.detail.bedrmnum, max:obj.detail.bedrmnum*2+2});
            var bedoptions = ['1 queen bed','1 single bed','1 king bed','2 single beds']
            var beds = []
            for(var i=0; i<obj.detail.bedrmnum; i++){
                var currBedoption = bedoptions[Math.floor(Math.random()*bedoptions.length)]
                bedcounter += parseInt(currBedoption.slice(0,1))
                beds.push(currBedoption)
            }
            obj.detail.beds = beds;
            obj.detail.bednum = bedcounter;
        } else if (type === 'Shared room'){
            obj.detail.bedrmnum = 1;
            obj.detail.bathrmnum = faker.random.number({min:obj.detail.bedrmnum, max:obj.detail.bedrmnum});
            obj.detail.guestmax = faker.random.number({min:1, max:obj.detail.bedrmnum*4});
            var bedoptions = ['1 queen bed','1 single bed','2 single beds'];
            var bedoption = bedoptions[Math.floor(Math.random()*bedoptions.length)]
            obj.detail.beds = [bedoption];
            obj.detail.bednum = parseInt(bedoption.slice(0,1));
        }
    }
    generatedetail(obj.detail.type);
    
    obj.highlights =  {};
    var guest = (obj.detail.guestmax===1) ? obj.detail.guestmax+' guest' : obj.detail.guestmax +' guests';
    var bedrm = (obj.detail.bedrmnum===1) ? obj.detail.bedrmnum+' room' : obj.detail.bedrmnum +' rooms';
    var bed = (obj.detail.bednum===1) ? obj.detail.bednum+' bed' : obj.detail.bednum +' beds';
    var bath = (obj.detail.bathrmnum===1) ? obj.detail.bathrmnum+' bath' : obj.detail.bathrmnum +' baths';
    if(obj.detail.type==='Entire place'){
        obj.highlights['Entire apartment'] = guest + '\t' + bedrm + '\t' + bed + '\t' + bath;
    } else if(obj.detail.type==='Private room'){
        obj.highlights['Private room in house'] = guest + '\t' + bedrm + '\t' + bed + '\t' + bath;
    } else if(obj.detail.type==='Hotel room'){
        obj.highlights['Private room in hostel'] = guest + '\t' + bedrm + '\t' + bed + '\t' + bath;
    } else if(obj.detail.type==='Shared room'){
        let sharebath; 
        if(obj.detail.bathrmnum===0){
            sharebath = null;
        } else if (obj.detail.bathrmnum===1){
            sharebath = obj.detail.bathrmnum+' bath'
        } else if (obj.detail.bathrmnum>1){  
            sharebath = obj.detail.bathrmnum +' baths'
        };
        obj.highlights['Shared room in house'] = guest + '\t' + bedrm + '\t' + bed + '\t' + sharebath;
    }
    var highlightsoptions = [obj.host.name+' is a Superhost', 'Sparkling clean', 'Self check-in', 'Great location','Great check-in experience']
    highlightsoptions.sort(() => Math.random()-0.5);
    highlightsoptions.slice(0,3)
    for(let i=0; i<3; i++){
        obj.highlights[highlightsoptions[i]]= faker.lorem.sentence()
    }
    obj.desc = {};
    var descsubtitle = ['General','The space', 'Guest access', 'Interation with guests', 'Other things to note','License or registartion number']
        
    for(var i=0; i<descsubtitle.length; i++){
        if(i===5){
            var licensenum = ''
            for(var n=0;n<7;n++){
                licensenum += faker.random.number({min:0, max:9})
            }
            obj.desc[descsubtitle[i]] = 'STR-' + licensenum;
        } else {
            obj.desc[descsubtitle[i]]= faker.lorem.paragraphs();
        }
    }
    return obj;
}
/* ================================================================ */
var generateamen = (num) =>{
    let obj = {}
    obj.id = num;
    var necessary = {
        'Wifi': 'Continuous access in the listing',
        'TV': null,
        'Cable TV': null,
        'Kitchen': 'Space where guests can cook their own meals',
        'Iron': null, 
        'Dryer': 'In the building, free or for a fee',
        'Washer': 'In the building, free or for a fee', 
        'Hangers':null,
        'Hotwater': null,
        'Essentials': 'Towels, bed sheets, soap, and toilet paper',       
        'Laptop friendly workspace': 'A table or desk with space for a laptop and a chair that’s comfortable to work in',
        'Hot water': null,
        'Air conditioning': null,
        'Free parking on premises': null,
    }
    var allIconAmenShuffle = Object.keys(necessary).slice(0,8).sort(() => Math.random()-0.5);
    var selectKeys = allIconAmenShuffle.slice(0,4)
    var restAmen = Object.keys(necessary).filter(amen=> 
        !selectKeys.includes(amen)
        )
    var shuffleRestAmen = restAmen.sort(() => Math.random()-0.5);
    var randomIndex= faker.random.number({min:1, max:shuffleRestAmen.length-1})
    selectKeys = selectKeys.concat(shuffleRestAmen.slice(0,randomIndex));
    // console.log('yes===',selectKeys)
    var nonSelectKeys = Object.keys(necessary).filter(amen=> 
        !selectKeys.includes(amen)
        )
    // console.log('no===',nonSelectKeys)
    
    var options = ['Dining','Guest access','Bed and bath','Outdoor','Safety features','Logistrics', 'Facilities','Family features'];
    var randomOptionNum = faker.random.number({min:1, max:3});
    var selectedOptions = options.sort(() => Math.random()-0.5).slice(0,randomOptionNum)
   
    obj.amenities = {};
    obj.amenities['Basic'] = {};
    for(var i=0; i<selectKeys.length; i++){
        obj.amenities['Basic'][selectKeys[i]] = necessary[selectKeys[i]]
    }

    for(var i=0; i<selectedOptions.length; i++){
        //selectedOptions[0] = 'Dining'
        obj.amenities[selectedOptions[i]] = {}
        let randomNum  = faker.random.number({min:2, max:3});
        let randomComment = faker.random.number({min:0, max:1});
        for(var j=0; j<randomNum; j++){
            var fakeAmen = faker.lorem.word();
            if(j*randomComment===0){
                obj.amenities[selectedOptions[i]][fakeAmen] = null
            } else {
                var fakeComment = faker.lorem.words();
                obj.amenities[selectedOptions[i]][fakeAmen] = fakeComment
            }
        }
    }


    obj.amenities['Not included'] = {};
    for(var i=0; i<nonSelectKeys.length; i++){
        obj.amenities['Not included'][nonSelectKeys[i]] = null;
    }
    return obj;
}

for(var i=1;i<=100;i++){   
    db.Desc.create(generatedesc(i),(err,res)=>{
        if(err){
            console.log(err)
        }  else {
            console.log('desc data insert success')
        }
    });
    db.Amenity.create(generateamen(i),(err,res)=>{
        if(err){
            console.log(err)
        }  else {
            console.log('amenity data insert success')
        }
    });
}

