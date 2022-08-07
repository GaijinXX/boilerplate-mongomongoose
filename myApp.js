require('dotenv').config();
const { Number } = require('mongoose');
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person;

let personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  new Person({
    name: "Big Gaijin",
    age: 12,
    favoriteFoods: ["diarrhea", "piss", "cum"]
  }).save()
    .then(doc => {
      done(null, doc);})
    .catch(err => {
      done(err);});
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
  .then(docs => {
    done(null, docs);})
  .catch(err => {
    done(err);});
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, docs) => {
    if(err) {
      done(err);
    } else {
      done(null, docs);
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, doc) => {
    if(err) {
      done(err);
    } else {
      done(null, doc);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, doc) => {
    if(err) {
      done(err);
    } else {
      done(null, doc);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, doc) => {
    if(err) {
      done(err);
    } else {
      doc.favoriteFoods.push(foodToAdd);
      doc.save((err, doc) => {
        if(err) {
          done(err);
        } else {
          done(null, doc);
        }
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, (err, doc) => {
    if(err) {
      done(err);
    } else {
      done(null, doc);
    }
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, (err, doc) => {
    if(err) {
      done(err);
    } else {
      done(null, doc);
    }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, result) => {
    if(err) {
      done(err);
    } else {
      done(null, result);
    }
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ food: foodToSearch }).sort('name').limit(2).select('-age').exec((err, result) => {
    if(err) {
      done(err);
    } else {
      done(null, result);
    }
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
