// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: question;
// Created by Max Forst
// Feel free to take my code and modify it in any way you want.



// If the script is running in a widget
if (config.runsInWidget){
  
// The widget will only show Pokémon whose Pokédex number are equal to or lower than the number below. A minimum dex number cannot be chosen. You may change this if you wish.
var maxDexNumber = 898

var WidgetSize = config.widgetFamily

// Get random number between 1 and maxDexNumber, as indicated above.  
var initialPKMNnumber = Math.floor(Math.random() * maxDexNumber)+ 1;

// Change the number format to add leading zeros if needed for accessing Pokémon image.
if (initialPKMNnumber < 10) {
  var PKMNnumber = "00"+initialPKMNnumber;
} else if (initialPKMNnumber < 100) {
  var PKMNnumber = "0"+initialPKMNnumber;
} else {
  var PKMNnumber = initialPKMNnumber
}

// Get Pokémon image
const url = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+PKMNnumber+".png"

const req = new Request(url)

const img = await req.loadImage()

// Get background image
var URL = "https://i.imgur.com/mNxCFN1.png"

const BGimageURL = new Request(URL)

const BGimage = await BGimageURL.loadImage()

const widgetArgs = args.widgetParameter

// Determine image size based on widget size.
if (WidgetSize === "large"){
  IMGheight = 230;
  IMGwidth = 230;
} else if (WidgetSize === "small"){
  IMGheight = 100;
  IMGwidth = 100;
} else {
  IMGheight = 230;
  IMGwidth = 230;
}

// Create the widget
let widget = createWidget("Unsplash random image", img)

Script.setWidget(widget)

Script.complete()

widget.presentLarge()


function createWidget(title, img) {

let w = new ListWidget()

w.backgroundImage = BGimage

w.setPadding(50, 0, 0, 0)

let image = w.addImage(img)

image.centerAlignImage()

image.imageSize = new Size(IMGheight, IMGwidth);

image.applyFillingContentMode()

image.tintColor = new Color("#000000")

// The x-Callback-URL to open when taping on the widget
w.url ="scriptable:///run?scriptName=Who's%20That%20Poke%CC%81mon?&action="+initialPKMNnumber

return w

}                 
}










// If the script is running in the app with no input.  
 else if (args.queryParameters.action === undefined){
  QuickLook.present("Please Run This Script From A Widget")
}






// If the user tapped on the widget.
else{
  var input = args.queryParameters.action
  
var initialPKMNnumber = input

// Change the number format to add leading zeros if needed for accessing Pokémon image.
if (initialPKMNnumber < 10) {
  var PKMNnumber = "00"+initialPKMNnumber;
} else if (initialPKMNnumber < 100) {
  var PKMNnumber = "0"+initialPKMNnumber;
} else {
  var PKMNnumber = initialPKMNnumber
}

// Get Pokémon's name from PokéAPI
let SpeciesAPI = await new Request("https://pokeapi.co/api/v2/pokemon-species/" + initialPKMNnumber).loadJSON();
  
var PKMNname = SpeciesAPI.names.find(name => name.language.name == "en")["name"];

// Get background image
var URL = "https://i.imgur.com/9uuXJlm.png"

const BGimageURL = new Request(URL)

const BGimage = await BGimageURL.loadImage()

// Create new widget to show in app
var W = new ListWidget()

W.backgroundImage = BGimage

var Header = W.addStack()

Header.addSpacer()

W.addSpacer()

var NameStack = W.addStack()

NameStack.addSpacer()

var name = NameStack.addText(PKMNname)

NameStack.addSpacer()

name.font = Font.boldSystemFont(50)

name.textColor = Color.black()

name.centerAlignText()

W.addSpacer()

var Body = W.addStack()

var Title = Header.addText("It's...")

Title.font = Font.boldSystemFont(20)

Title.textColor = Color.black()

Title.centerAlignText()

Header.addSpacer()

Body.addSpacer()

req = new Request("https://assets.pokemon.com/assets/cms2/img/pokedex/full/"+PKMNnumber+".png")

const img = await req.loadImage()

var image = Body.addImage(img)

image.imageSize = new Size(230,230)

Body.addSpacer()

await W.presentLarge()


// Close the app after viewing the widget
App.close()

}






