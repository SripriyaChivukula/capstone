const mongoose = require('mongoose');

const bakeryItemSchema = new mongoose.Schema({

    name:{
        type: String,
        unique: true,
        required: true,
      },
      itemtype:{
          type: String,
          required:true,
      },
      price:{
        type:Number,
        required:true,
      },
    });
    
    const BakeryGroup_Item = mongoose.model('BakeryItemSchema', bakeryItemSchema);
    
    module.exports = BakeryGroup_Item;
    


