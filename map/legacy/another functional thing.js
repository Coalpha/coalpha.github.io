function main() {
  const getDocumentElementById = geti(document);

  const areaIds = ['1A', '1B', '1C', '1D', '1E', 103, 105, 106, 108, 120];
  const areaInfo = {
    '1A': {},
  };
  const opacityDivisor = 2;
  const areaObj = {
    onclick(e) {
      info = areaInfo[this.id];
      getElement = R.prop('target');
      element = getElement(e);
      mutElementInfo = mutate(info);
      getAttribute = R.invoker(1, 'getAttribute');
      setAttribute = R.invoker(2, 'setAttribute');
      getOpacity = R.pipe(getElement, getAttribute('fill-opacity'));
      setOpacity = R.pipe(getElement, setAttribute('fill-opacity'));
      if (info.selected) {
        mutElementInfo('selected', false);
      } else {
        mutElementInfo('selected', true);
        mutElementInfo('originalOpacity', getOpacity);
        setOpacity(R.divide(R.__, opacityDivisor));
      }
    },
  };

  const impure = fn => (...args) => {
    fn(...args);
    return args;
  };
  const mutate = impure(R.curry((obj, key, val) => object[key] = val));
  const oAssign = R.flip(R.curry(Object.assign));
  const geti = R.flip(R.invoker(1, 'getElementById'));

  const getContentDocument = R.prop('contentDocument');
  const getSubId = R.pipe(getDocumentElementById, getContentDocument, geti);
  const getIdFromMap = getSubId('map');
  const mapFromAreaIds = R.map(R.__, areaIds);
  const assignAreaObj = oAssign(areaObj);
  const assignAreaObjToMapId = R.pipe(getIdFromMap, assignAreaObj);
  mapFromAreaIds(assignAreaObjToMapId);
}
window.addEventListener('load', main);
