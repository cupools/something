export const correct = function(material) {
  return Object.keys(material).reduce(
    (ret, stage) => ({
      ...ret,
      [stage]: Object.keys(material[stage]).reduce(
        (mem, item) => {
          const { animation, animationProperty, ...opts } = material[stage][item];
          const animations = [].concat(animation);
          const properties = animations.map((_, index) => Object.assign({}, opts, [].concat(animationProperty)[index]));
          return {
            ...mem,
            [item]: {
              animation: animations,
              animationProperty: properties,
            },
          };
        },
        material[stage]
      ),
    }),
    material
  );
};

export const hookAniEnd = function(material, stage, callback) {
  if (!material[stage]) {
    return { ...material };
  }

  const items = material[stage];
  const info = Object.keys(items).reduce(
    (mem, key) => {
      const item = items[key];
      const { animationProperty } = item;
      const { spending, index } = animationProperty.reduce(
        (ret, item, index) => {
          const { loop = 1, duration = 0, delay = 0 } = item;

          if (ret.loop) {
            return ret;
          } else if (loop === true) {
            return {
              ...ret,
              loop: true,
            };
          }
          return {
            spending: ret.spending + delay + duration * loop,
            index,
            loop: loop === true,
          };
        },
        {
          spending: 0,
          index: -1,
          loop: false,
        }
      );

      return spending > mem.spending
        ? {
          keyName: key,
          index,
          spending,
        }
        : mem;
    },
    {
      keyName: null,
      index: -1,
      spending: 0,
    }
  );

  if (!info.keyName) {
    return material;
  }

  const target = material[stage][info.keyName];
  return {
    ...material,
    [stage]: {
      ...material[stage],
      [info.keyName]: {
        ...target,
        animationProperty: [].concat(
          target.animationProperty.slice(0, info.index),
          {
            ...target.animationProperty.slice(info.index)[0],
            complete: callback,
          },
          target.animationProperty.slice(info.index + 1)
        ),
      },
    },
  };
};
