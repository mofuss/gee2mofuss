var modis_lc = ee.ImageCollection("MODIS/061/MCD12Q1"),
    copernicus_lc = ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global"),
    GFC = ee.Image("UMD/hansen/global_forest_change_2021_v1_9"),
    SRTM = ee.Image("CGIAR/SRTM90_V4"),
    JRC_GSW = ee.Image("JRC/GSW1_4/GlobalSurfaceWater"),
    GLCG_IW = ee.ImageCollection("GLCF/GLS_WATER"),
    WWF_rivers = ee.FeatureCollection("WWF/HydroSHEDS/v1/FreeFlowingRivers"),
    JRC_Historical = ee.ImageCollection("JRC/GSW1_4/YearlyHistory"),
    WCMC = ee.ImageCollection("WCMC/biomass_carbon_density/v1_0"),
    WHRC = ee.Image("WHRC/biomass/tropical"),
    GEDI = ee.Image("LARSE/GEDI/GEDI04_B_002"),
    DAAC = ee.ImageCollection("NASA/ORNL/biomass_carbon_density/v1"),
    SMAP = ee.ImageCollection("NASA/SMAP/SPL4SMGP/007"),
    ISDA = ee.Image("ISDASOIL/Africa/v1/bedrock_depth"),
    OpenLandMap = ee.Image("OpenLandMap/SOL/SOL_GRTGROUP_USDA-SOILTAX_C/v01"),
    SoilGrid = ee.Image("projects/soilgrids-isric/sand_mean"),
    ERA5 = ee.ImageCollection("ECMWF/ERA5/MONTHLY"),
    GCOM = ee.ImageCollection("JAXA/GCOM-C/L3/LAND/LST/V3"),
    GPM = ee.ImageCollection("NASA/GPM_L3/IMERG_V06"),
    localClimate = ee.ImageCollection("RUB/RUBCLIM/LCZ/global_lcz_map/v1"),
    TRMM = ee.ImageCollection("TRMM/3B43V7"),
    WorldClim = ee.ImageCollection("WORLDCLIM/V1/MONTHLY"),
    CHIRPS = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY"),
    RESOLVE = ee.FeatureCollection("RESOLVE/ECOREGIONS/2017"),
    WorldPop = ee.ImageCollection("WorldPop/GP/100m/pop"),
    GPW = ee.ImageCollection("CIESIN/GPWv411/GPW_Population_Count"),
    GHSL = ee.ImageCollection("JRC/GHSL/P2016/POP_GPW_GLOBE_V1"),
    WDPA = ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[179.45820312499995, 85.14543824015983],
          [179.45820312499995, -71.56620884017953],
          [538.755078125, -71.56620884017953],
          [538.755078125, 85.14543824015983]]], null, false),
    HRSL_elderly_over_sixty = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_elderly_over_sixty"),
    HRSL_women_reproductive_age = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_women_reproductive_age"),
    HRSL_children_under_five = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_children_under_five"),
    HRSL_youth = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_youth"),
    HRSL_women = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_women"),
    HRSL_men = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_men"),
    HRSL = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrslpop"),
    geometry2 = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[36.403855845858295, -0.4516156589439441],
          [36.403855845858295, -1.528099301140791],
          [37.480516002108295, -1.528099301140791],
          [37.480516002108295, -0.4516156589439441]]], null, false),
    geometry3 = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-127.6171875, 56.92754290638271],
          [-127.6171875, -58.09476659790445],
          [145.546875, -58.09476659790445],
          [145.546875, 56.92754290638271]]], null, false),
    forma = ee.Image("WRI/GFW/FORMA/thresholds"),
    GFCC = ee.ImageCollection("NASA/MEASURES/GFCC/TC/v3"),
    grip4_south_east_asia = ee.FeatureCollection("projects/sat-io/open-datasets/GRIP4/South-East-Asia"),
    grip4_oceania = ee.FeatureCollection("projects/sat-io/open-datasets/GRIP4/Oceania"),
    grip4_central_south_america = ee.FeatureCollection("projects/sat-io/open-datasets/GRIP4/Central-South-America"),
    grip4_africa = ee.FeatureCollection("projects/sat-io/open-datasets/GRIP4/Africa"),
    grip4_europe = ee.FeatureCollection("projects/sat-io/open-datasets/GRIP4/Europe"),
    grip4_north_america = ee.FeatureCollection("projects/sat-io/open-datasets/GRIP4/North-America"),
    grip4_middle_east_central_asia = ee.FeatureCollection("projects/sat-io/open-datasets/GRIP4/Middle-East-Central-Asia"),
    MofussRegions = ee.FeatureCollection("users/aghilardi/mofuss_regions0_simp"),
    LSIBs = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    ESA_AGB_CCI = ee.ImageCollection("projects/sat-io/open-datasets/ESA/ESA_CCI_AGB");

// -------------------------------------User-defined variables----------------------------------------------
// Make sure to fill the following variables as desired
// Type of Roi
var tyRoi = 'countries'; //'world','regions','countries';
// If tyRoi == 'countries', type country name here.
// If tyRoi == 'regions', type region name here.
// If tyRoi == 'world, country is not used.
var country = 'RWD'; //'ASIA_adm0_central','NPL', country or region of interest. Check console for available
// options.
// Pixel size in m
var scale = 100; // 1000 or 100

// Modis LULC year
// e.g. to Download 2015 LULC
var modStart = '2010-01-01',
modEnd = '2010-12-31',
modExp = modStart.substring(0,4),
// Copernicus LULC year
copStart = '2015-01-01',
copEnd = '2015-12-31',
copExp = copStart.substring(0,4),
// Copernicus bands to download
copernicusBands = ['discrete_classification', 'discrete_classification-proba'],
copB = copernicusBands.length;

// Other user defined variables
// Projection for exports
var epsg = 'EPSG:4326';//'EPSG:3395';//;//'EPSG:8857';//'ESRI:54009';//'EPSG:9822';//'EPSG:8857';
// Folder for exports
var folder = 'GEE2MoFuSS100m';

//------------------------Ends User-defined variables-------------------------
// tests
var everest = ee.Geometry.Point(86.925278, 27.988056);
var deadSea = ee.Geometry.Point(35.5, 31.5);

// function to check pyramiding policy
/*
var printAtScale = function(image, scale, clase) {
  print('Pixel value at '+scale+' meters scale',
    image.reduceRegion({
      reducer: ee.Reducer.first(),
      geometry: geometry4,
      // The scale determines the pyramid level from which to pull the input
      scale: scale
  }).get(clase));
};
*/
/*
Map.addLayer(everest, {}, 'everest');
var printAtScale = function(scale) {
  print('Pixel value at '+scale+' meters scale',
    SRTM.reduceRegion({
      reducer: ee.Reducer.max(),
      geometry: everest,
      // The scale determines the pyramid level from which to pull the input
      scale: scale
  }).get('elevation'));
};
var printAtScale2 = function(scale) {
  print('Pixel value at '+scale+' meters scale',
    SRTM.reduceRegion({
      reducer: ee.Reducer.max(),
      geometry: deadSea,
      // The scale determines the pyramid level from which to pull the input
      scale: scale
  }).get('elevation'));
};
*/
//var roi1 = polys.filter(ee.Filter.inList('GID_0', 
//['DJI','ERI','ETH','KEN','SOM','SSD','UGA']));
//var roi2 = polys.filter(ee.Filter.inList('GID_0', 
//['DJI','ERI','ETH','KEN','SOM','SSD','UGA']).not());

//var region = ee.FeatureCollection(table2).first()
//                                         .geometry()
//                                         .bounds(0.01, epsg);
//ee.Algorithms.If(tyRoi != 'countries' & tyRoi != 'regions', print('Invalid tyRoi'), print('go'));
var roi = LSIBs;
var helper = 'world';
var zoom = 1;
// Primero que salga helper aunque salga error
if(tyRoi != 'world'){
    if(tyRoi == 'regions'){
    helper = MofussRegions.aggregate_array('mofuss_reg').distinct().sort();
  }else{
    var helper3 =  MofussRegions.aggregate_array('NAME_0').distinct();
    var helper2 = MofussRegions.aggregate_array('GID_0').distinct();
    helper = ee.Dictionary.fromLists(helper3, helper2);
    zoom = 6;
  }
}

print('Options for '+'country var'+':', helper);

if(tyRoi != 'world'){
    if(tyRoi == 'regions'){
    roi = MofussRegions.filter(ee.Filter.eq('mofuss_reg', country)).union();
    zoom = 3;
  }else{
    roi = MofussRegions.filter(ee.Filter.eq('GID_0', country)).union();
    zoom = 6;
  }
  Map.centerObject(roi, zoom);
}

print('If you do not see any layers on the map, do not export');
print('Try first correcting the country var value');

var rectangle = roi;
//Map.addLayer(roi);
// Look for other datasets here 
// https://gee-community-catalog.org/
// Pasos reproyectar, cortar y descargar

// Tier 1 datos globales
// Tier 2 datos nacionales


/*
Taken from MoFuSS gitlab:

Administrative (mandatory)
https://gadm.org/

Land use cover classifications (mandatory)
MODIS: https://lpdaac.usgs.gov/products/mcd12q1v006/
ESRI: https://livingatlas.arcgis.com/landcover/
Same as above, just the actual link to download: https://www.arcgis.com/apps/instant/media/index.html?appid=fc92d38533d440078f17678ebc20e8e2
Copernicus: https://lcviewer.vito.be/download

Global Forest Change 2000–2019 (mandatory)
Tree canopy cover, global forest cover gain, and year of gross forest cover loss event:
http://earthenginepartners.appspot.com/science-2013-global-forest/download_v1.7.html

Elevation (mandatory)
https://www.usgs.gov/centers/eros/science/usgs-eros-archive-digital-elevation-shuttle-radar-topography-mission-srtm-1-arc?qt-science_center_objects=0#qt-science_center_objects
https://www.intelligence-airbusds.com/imagery/rbeference-layers/

Rivers and Road network (mandatory)
https://download.geofabrik.de/

Biomass and/or carbon stocks (mandatory)
Global Forest Watch (GFW): https://data.globalforestwatch.org/datasets/aboveground-live-woody-biomass-density/explore?location=8.862354%2C0.000000%2C2.09
Global Maps C (NASA):

https://daac.ornl.gov/cgi-bin/dsviewer.pl?ds_id=1763
https://daac.ornl.gov/cgi-bin/dsviewer.pl?ds_id=1296

GlobBiomass:https://globbiomass.org/wp-content/uploads/GB_Maps/Globbiomass_global_dataset.html
WCMC: https://data-gis.unep-wcmc.org/portal/home/item.html?id=8a8d4e24683a46e6b039aea78c8af20f
WHRC: https://developers.google.com/earth-engine/datasets/catalog/WHRC_biomass_tropical
Nasa Earth Data:
The Carbon Source: http://www.thecarbonsource.org/#7/19.394/-70.807

Key References
https://www.nature.com/articles/s41597-020-0444-4
http://www.thecarbonsource.org/
https://iopscience.iop.org/article/10.1088/1748-9326/ac8694

2000 and 2020 tree cover height, tree cover gain, and net change in tree cover (optional)
<>

Key References
https://www.globalforestwatch.org/blog/data-and-research/new-gfw-tree-cover-gain-net-change-data/?utm_campaign=gfwrestorationdata&utm_medium=bitly&utm_source=EmailBlast
https://www.frontiersin.org/articles/10.3389/frsen.2022.856903/full
https://www.wri.org/initiatives/global-restoration-initiative?utm_campaign=gfwrestorationdata&utm_medium=bitly&utm_source=EmailBlast

Soil (optional)
<< Maruo Guevara has all the links >>

Climate (optional)

Forest type (optional)

Ecoregions (optional)

Population (mandatory)
population/pop density
https://populationexplorer.org/
https://data.humdata.org/organization/facebook?q=high%20resolution%20population%20density&ext_page_size=100
others
https://popgrid.org/
https://www.ipums.org/

Protected Areas (mandatory)
https://www.iucn.org/theme/protected-areas/our-work/quality-and-effectiveness/world-database-protected-areas-wdpa#:\~:text=The%20World%20Database%20on%20Protected,in%20conserving%20species%20and%20ecosystems

Other data repositories worth taking a look at
https://hub.arcgis.com/
http://www.naturalearthdata.com/
https://earthexplorer.usgs.gov/
https://gisgeography.com/openstreetmap-download-osm-data/
http://sedac.ciesin.columbia.edu/
http://www.opentopography.org/
http://geodata.grid.unep.ch/
http://neo.sci.gsfc.nasa.gov/
https://scihub.copernicus.eu/dhus
https://www.terrapop.org/
http://www.fao.org/geonetwork
*/
/*
// 1. Administrative
countries_detailed;
countries_simplified;

// Meter GADM -> De GEE
// Recorte por regiones
*/

// 2. Land cover
modis_lc;
copernicus_lc;

var modisLc = ee.Image(modis_lc.select('LC_Type1')
                                .filterDate(modStart, modEnd)
                                .first())
                                .selfMask();

var copernicusLc = ee.Image(copernicus_lc.select(copernicusBands)
                                        .filterDate(copStart, copEnd)
                                        .first())
                                        .selfMask();   

//print('copernicusLc', copernicusLc);
//Map.addLayer(copernicusLc, {}, 'copernicusLc');                            
/*Map.addLayer(modis_lc.select('LC_Type1')
                     .filterDate('2015-01-01', '2016-01-01')
                     .max()
                     .clip(table2),{
  min:1, max:17,
                       palette: ['#05450a',
'#086a10',
'#54a708',
'#78d203',
'#009900',
'#c6b044',
'#dcd159',
'#dade48',
'#fbff13',
'#b6ff05',
'#27ff87',
'#c24f44',
'#a5a5a5',
'#ff6d4c',
'#69fff8',
'#f9ffa4',
'#1c0dff']
                     }, 
  'MODIS LC');
*/

// 3. Global forest change
GFC;

var loss = GFC.select('loss')
              .selfMask();
                  
var yearLoss = GFC.select('lossyear')
                .selfMask();

//Map.addLayer(yearLoss,{min: 0, max: 1},'yearLoss');

var gain = GFC.select('gain')
                .selfMask();

GFCC;

// tree cover, lossyear, gain
/*
Map.addLayer(GFC.select('treecover2000').clip(table2),{
  min:0, max:100, palette: ['#ffffff', '#0a9c0c']}, 
  'GFC tree cover');
Map.addLayer(GFC.select('loss').clip(table2),{
  min:0, max:1, palette: ['#000000', '#FF0000']}, 
  'GFC loss');
//Map.addLayer(GFC.select('lossyear'),{
//  min:0, max:21}, 
//  'GFC loss year');
//Map.addLayer(GFC.select('gain'),{
//  min:0, max:1}, 
//  'GFC gain');
*/
var GFCC2000 = GFCC.filterDate('2000-01-01','2001-01-01')
                .median()
                .select(['tree_canopy_cover','uncertainty'])
                .selfMask();
var GFCC2005 = GFCC.filterDate('2005-01-01','2006-01-01')
                .median()
                .select(['tree_canopy_cover','uncertainty'])
                .selfMask();
var GFCC2010 = GFCC.filterDate('2010-01-01','2011-01-01')
                .median()
                .select(['tree_canopy_cover','uncertainty'])
                .selfMask();
var GFCC2015 = GFCC.filterDate('2015-01-01','2016-01-01')
                .median()
                .select(['tree_canopy_cover','uncertainty'])
                .selfMask();
/*
print('GFCC', GFCC.limit(10));
Map.addLayer(GFCC2015.clip(table2),{
                  bands: ['tree_canopy_cover'],
  min:0, max:100, palette: ['#ffffff', '#0a9c0c']}, 
  'GFCC tree cover 2015');
*/
// 4. Elevation
SRTM;
/*
Map.addLayer(SRTM.select('elevation'),//.clip(table2),
{
  min:70, max:5200}, 
  'DEM');

printAtScale(scale);  
printAtScale2(scale);  
*/
// 5. Rivers
// Openstreetmap usar
var JRC_GSWPro = JRC_GSW.selfMask().int();
var GLCG_IWPro = GLCG_IW.map(function(image){
  var maskIm = ee.Image(image).select('water').eq(2);
  return ee.Image(image).updateMask(maskIm);
}).median();
WWF_rivers;
var JRC_HistoricalPro = JRC_Historical.mode().int();

if(tyRoi != 'world'){
  Map.addLayer(JRC_GSWPro.clip(roi), {}, 'JRC_GSWPro');
  Map.addLayer(GLCG_IWPro.clip(roi), {}, 'GLCG_IWPro');
  //Map.addLayer(WWF_rivers.filterBounds(roi.union().geometry()), {}, 'WWF_rivers');
  Map.addLayer(JRC_HistoricalPro.clip(roi), {}, 'JRC_Historical');
}else{
  Map.addLayer(JRC_GSWPro, {}, 'JRC_GSWPro');
  Map.addLayer(GLCG_IWPro, {}, 'GLCG_IWPro');
  //Map.addLayer(WWF_rivers.filterBounds(roi.union().geometry()), {}, 'WWF_rivers');
  Map.addLayer(JRC_HistoricalPro, {}, 'JRC_Historical');
}
// Possibly also use the modis and copernicus land covers

//6. Roads (missing)
// Openstreetmap usar
grip4_south_east_asia;
grip4_oceania;
grip4_central_south_america;
grip4_africa;
grip4_europe;
grip4_north_america;
grip4_middle_east_central_asia;

var grip4_africaLines = grip4_africa
    .map(function (f) { 
      return ee.Feature(f).set('geometry_type', ee.Feature(f).geometry().type()); })
    .filter(ee.Filter.equals('geometry_type', 'LineString'));

grip4_africaLines = ee.FeatureCollection(grip4_africaLines);

//Map.addLayer(grip4_africa, {}, 'grip4_africa');
//Map.addLayer(grip4_africaLines, {}, 'grip4_africaLines');


//7. Biomass
WCMC;
WHRC;
GEDI;
DAAC;
ESA_AGB_CCI;

// Visualizar la capa como se exporta
// DAAC
if(tyRoi != 'world'){
  Map.addLayer(DAAC.select(['agb','agb_uncertainty'])
                          // Reduce collection to single image
                          .median()
                          // convert from C content to AGB normal (inverse of 0.5)
                          .multiply(2)
                          //Scale to remove decimals
                          //.multiply(100)
                          .round()
                          .int()
                          .clip(roi), {
    bands: ['agb', 'agb_uncertainty'],
    min: 3, max:170
  }, 'DAAC');
}else{
  Map.addLayer(DAAC.select(['agb','agb_uncertainty'])
                        // Reduce collection to single image
                        .median()
                        // convert from C content to AGB normal (inverse of 0.5)
                        .multiply(2)
                        //Scale to remove decimals
                        //.multiply(100)
                        .round()
                        .int(), {
  bands: ['agb', 'agb_uncertainty'],
  min: 3, max:170
}, 'DAAC');
}

if(tyRoi != 'world'){
  Map.addLayer(ESA_AGB_CCI.select(['AGB','SD'])
                          // Reduce collection to single image
                          .median()
                          // convert from C content to AGB normal (inverse of 0.5)
                          // .multiply(2)
                          //Scale to remove decimals
                          //.multiply(100)
                          .round()
                          .int()
                          .clip(roi), {
    bands: ['AGB','SD'],
    min: 3, max:170
  }, 'ESA_AGB_CCI');
}else{
  Map.addLayer(ESA_AGB_CCI.select(['AGB','SD'])
                        // Reduce collection to single image
                        .median()
                        // convert from C content to AGB normal (inverse of 0.5)
                        //.multiply(2)
                        //Scale to remove decimals
                        //.multiply(100)
                        .round()
                        .int(), {
  bands: ['AGB','SD'],
  min: 3, max:170
}, 'ESA_AGB_CCI');
}


//Map.addLayer(GEDI, {bands: 'MU', 
//  min: 8, max: 391, palette: ['#fde725','#5ec962','#21918c',
//  '#3b528b','#440154']}, 'GEDI');
/*
//8. Soil (optional)
SMAP;
// The following have a lot of different datasets. Check them
ISDA;
OpenLandMap;
SoilGrid;

//9. Climate (optional)
ERA5;
GCOM; 
GPM;
localClimate;
TRMM; 
WorldClim; 
CHIRPS;

//10. Forest (missing)

//11. Ecoregions
RESOLVE; 

//12. Population
// Esto es algo que hizo Rob (datos que no están acá)
WorldPop;
GPW;
GHSL;
HRSL;
*/
/*
// Get default projections to use in setDefaults
var proj4exp1 = HRSL.first().projection();
//print('proj4exp1 HRSL', proj4exp1);
//print('pixel size HRSL', proj4exp1.nominalScale());

var expHRSL = HRSL.max()
                  .selfMask()
                  .rename('pop')
                  .clip(roi)
                  .setDefaultProjection(proj4exp1)
                  // Reduce resolution by summing pixels
                  // reproject to image with 500 m pixels
                  .reduceResolution({
                    bestEffort: true,
                    reducer: ee.Reducer.sum().unweighted(),
                    maxPixels: 512,
                  })
                  .reproject({
                    crs: epsg,
                    scale: ee.Number(scale).divide(2)
                  })
                  .reduceResolution({
                    bestEffort: true,
                    reducer: ee.Reducer.sum().unweighted(),
                    maxPixels: 512,
                  })
                  // Reduce resolution by summing pixels
                  // reproject to image with scale m pixels
                  .reproject({
                    crs: epsg,
                    scale: scale
                  })
                  .selfMask();
*/
/*
var totalPop = expHRSL.reduceRegion({
                      reducer: ee.Reducer.sum(),
                      geometry: roi.geometry(),
                      scale: scale,
                      bestEffort: true,
                      tileScale:16,
                      crs: epsg,
                      maxPixels:1e12 
                    }).getNumber('pop');
*/                    
//print('HRSL totalPop at '+ scale + ' m: ', totalPop);

/*
var proj1 = HRSL.first().projection();

//print('proj1', proj1);
                
//print('expHRSL', expHRSL);
//Map.addLayer(expHRSL, {min: 0, max:5000}, 'expHRSL');

var proj4exp = GPW.first().projection();
//print('proj4exp', proj4exp);
//var pixel = proj4exp.nominalScale();
//print('pixel GPW', pixel);

var expGPW = GPW.filterDate('2014-01-01','2016-01-01')
                .max()
                  //.selfMask()
                  .rename('pop')
                  .clip(roi)
                  .setDefaultProjection(proj4exp)
                  //.reduceResolution({
                  //  bestEffort: true,
                  //  reducer: ee.Reducer.sum().unweighted(),
                  //  maxPixels: 2,
                  //})
                  .reproject({
                    crs: epsg,
                    scale: scale
                  });
                  //.selfMask();
*/
//Map.addLayer(expGPW, {min: 0, max:5000}, 'expGPW');
/*
var totalPopGPW = expGPW.reduceRegion({
                      reducer: ee.Reducer.sum(),
                      geometry: roi.geometry(),
                      scale: pixel,
                      bestEffort: true,
                      tileScale:16,
                      crs: epsg,
                      maxPixels:1e12 
                    }).getNumber('pop');
                    
print('GPW totalPop at '+ 'nominalScale' + ' m: ', totalPopGPW);
*/

//13. Protected areas
//WDPA;

//----------Export---------------------------------------
var roiExp = null;
if(tyRoi != 'world'){
  roiExp = roi;
}

var exportFunc = function(image, description, scale, crs, roiExp){
  Export.image.toDrive({
    image: image, 
    description: description, 
    folder: folder, 
    scale: scale, 
    region: roiExp,
    crs: crs, 
    maxPixels: 1e12, 
  });
};

// Description suffix
var suffix = tyRoi;
if(tyRoi != 'world'){
  if(tyRoi == 'countries')
  suffix = suffix+'_'+country;
}
/*
exportFunc(ee.Image(WHRC
                        .multiply(100)
                        .round()
                        .int()), 
  'WCMC_global_scalescale', 
  scale);
*/

exportFunc(ee.Image(DAAC.select(['agb','agb_uncertainty'])
                        // Reduce collection to single image
                        .median()
                        // convert from C content to AGB normal (inverse of 0.5)
                        .multiply(2)
                        //Scale to remove decimals
                        //.multiply(100)
                        .round()
                        .int()), 
  'AGB_DAAC_'+suffix+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);
  exportFunc(ESA_AGB_CCI, 
  'ESA_AGB_CCI_'+suffix+'_'+modExp+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);
exportFunc(modisLc, 
  'Modis_LCType1_'+suffix+'_'+modExp+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);
exportFunc(copernicusLc, 
  'Copernicus_'+copB+'B_'+suffix+'_'+copExp+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);
exportFunc(ee.Image(GFC.select('treecover2000')
                       //.multiply(100)
                       .int()), 
  'GFC_Treecover2000_'+suffix+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);
exportFunc(ee.Image(yearLoss.int()), 
  'GFC_Lossyear_'+suffix+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);
exportFunc(ee.Image(gain.int()), 
  'GFC_Gain2012_'+suffix+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);
exportFunc(ee.Image(GFCC2000.select(['tree_canopy_cover', 'uncertainty'])
                       //.multiply(100)
                       .int()), 
  'GFCC_TC2000_'+suffix+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);
exportFunc(ee.Image(GFCC2005.select(['tree_canopy_cover', 'uncertainty'])
                       //.multiply(100)
                       .int()), 
  'GFCC_TC2005_'+suffix+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);
exportFunc(ee.Image(GFCC2010.select(['tree_canopy_cover', 'uncertainty'])
                       //.multiply(100)
                       .int()), 
  'GFCC_TC2010_'+suffix+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);
exportFunc(ee.Image(GFCC2015.select(['tree_canopy_cover', 'uncertainty'])
                       //.multiply(100)
                       .int()), 
  'GFCC_TC2015_'+suffix+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);
exportFunc(ee.Image(SRTM.select('elevation')
                        .int()), 
  'DEM_SRTM_'+suffix+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);
  
exportFunc(JRC_GSWPro, 
  'JRC_GSW_'+suffix+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);
  
exportFunc(JRC_HistoricalPro, 
  'JRC_Historical_'+suffix+'_'+scale+'scale', 
  scale,
  epsg,
  roiExp);

/*
Export.table.toDrive({
  collection: grip4_africaLines,
  description: 'GRIP4_lines_Africa',
  folder: folder,
  fileFormat: 'SHP',
  maxVertices: 1e8
});
*/ 

//Map.addLayer(WHRC.clip(region), {}, 'Test');
//var world = ee.Geometry.Rectangle([0, -90, 250, 90]);
//Map.addLayer(world);
/*
exportFunc(ee.Image(WHRC
                        .multiply(100)
                        .round()
                        .int()
                        .clip(roi)), 
  'WCMC_global_1000scale_EastAfrica', 
  1000);
*/

  
/*
for(var i = 0; i < keys.size().getInfo(); i++){
  print(i);
  var key = keys.getString(i);
  var roiExp = polys.filter(ee.Filter.eq('GID_0', key))
                    .first();
  exportFunc(ee.Image(expGPW
                        .clip(roiExp)), 
  'GPW_1000m_'+key.getInfo()+'_SingleReproj', 
  1000,
  roiExp);
  
exportFunc(ee.Image(expHRSL
                        .clip(roiExp)), 
  'HRSL_1000m_'+key.getInfo()+'_DoubleRescale', 
  1000,
  roiExp);
}
*/



