//mockdata
const faker = require('faker');
const db = require('./index')


var generatedesc = (num) => {
    let obj = {}
    obj.id = num;
    obj.title =  faker.lorem.sentence();
    obj.location = faker.address.city();
    obj.host = {};
        obj.host.name = faker.name.firstName();
        obj.host.pic = faker.image.imageUrl();
    obj.detail = {};
    obj.detail.type = faker.random.arrayElement(['Entire place','Private room','Hotel room','Shared room']);
    var generatedetail = (type) => {
        if(type === 'Entire place'){

            obj.detail.bedrmnum = faker.random.number({min:3, max:6});
            obj.detail.bathrmnum = faker.random.number({min:1, max:obj.detail.bedrmnum});
            obj.detail.guestmax = faker.random.number({min:obj.detail.bedrmnum, max:obj.detail.bedrmnum*2+2});
            var bedoptions = ['1 queen bed','1 single bed','1 king bed']
            var beds = []
            for(var i=0; i<obj.detail.bedrmnum; i++){
                beds.push(bedoptions[Math.floor(Math.random()*bedoptions.length)])
            }
            obj.detail.bednum = beds;
            
        } else if (type === 'Private room'){
            obj.detail.bedrmnum = 1;
            obj.detail.bathrmnum = 1;
            obj.detail.guestmax = faker.random.number({min:1, max:3});
            var bedoptions = ['1 queen bed','1 single bed','1 king bed']
            var bedoption = bedoptions[Math.floor(Math.random()*bedoptions.length)]
            obj.detail.bednum = [bedoption];
            
        } else if (type === 'Hotel room'){
            obj.detail.bedrmnum = faker.random.number({min:1, max:3});
            obj.detail.bathrmnum = faker.random.number({min:1, max:obj.detail.bedrmnum});
            obj.detail.guestmax = faker.random.number({min:obj.detail.bedrmnum, max:obj.detail.bedrmnum*2+2});
            var bedoptions = ['1 queen bed','1 single bed','1 king bed']
            var beds = []
            for(var i=0; i<obj.detail.bedrmnum; i++){
                beds.push(bedoptions[Math.floor(Math.random()*bedoptions.length)])
            }
            obj.detail.bednum = beds;
        } else if (type === 'Shared room'){
            obj.detail.bedrmnum = 1;
            obj.detail.bathrmnum = faker.random.number({min:obj.detail.bedrmnum, max:obj.detail.bedrmnum});
            obj.detail.guestmax = faker.random.number({min:1, max:obj.detail.bedrmnum*4});
            var bedoptions = ['1 queen bed','1 single bed'];
            var bedoption = bedoptions[Math.floor(Math.random()*bedoptions.length)]
            obj.detail.bednum = [bedoption];
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
    // console.log('obj====',obj)
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
        'Hotwater': null,
        'Essentials': 'Towels, bed sheets, soap, and toilet paper',       
        'Laptop friendly workspace': 'A table or desk with space for a laptop and a chair that’s comfortable to work in',
        'Hot water': null,
        'Air conditioning': null,
        'Free parking on premises': null,
        'Hair dryer': null,

    
    }
   
    var shuffleNecKeys = Object.keys(necessary).sort(() => Math.random()-0.5);
    var randomIndex= faker.random.number({min:4, max:shuffleNecKeys.length-1})
    var selectKeys = shuffleNecKeys.slice(0,randomIndex);
    // console.log('yes===',selectKeys)
    var nonSelectKeys = shuffleNecKeys.slice(randomIndex,shuffleNecKeys.length);
    // console.log('no===',nonSelectKeys)
    // console.log('test????',necessary[selectKeys[0]])
    // var options = ['Dining','Guest access','Bed and bath','Outdoor','Safety features','Logistrics', 'Facilities','Family features'];
    obj.amenities = {};
    obj.amenities['Basic'] = {};
    for(var i=0; i<selectKeys.length; i++){
        obj.amenities['Basic'][selectKeys[i]] = necessary[selectKeys[i]]
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

