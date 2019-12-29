/**
 * Prune is used to remove connection info from apollo responses.  Note that prune works
 * recursively and will traverse the whole object to remove elements.
 *
 * Prune also removes siblings to edges, like count and pageInfo.
 *
 * @param {object} data returned from the apollo store.
 * @param {string} nodeName name of the aliased nodes. Can have unintended consequences
 * if nodeName matches uninented data.
 */
const prune = (data, nodeName = "node") => {
  const dataType = typeof data;
  if (dataType === "undefined" || data === null) return null;
  if (dataType === "boolean") return data;
  if (dataType !== "object") return data;

  const dataNodeName = data[nodeName];
  if (dataNodeName) return prune(dataNodeName, nodeName);

  const { node } = data;
  if (node) return prune(node, nodeName);

  const { edges } = data;
  if (edges) return prune(edges, nodeName);

  if (Array.isArray(data)) return data.map(field => prune(field, nodeName));

  return Object.keys(data).reduce((acc, key) => {
    acc[key] = prune(data[key], nodeName);
    return acc;
  }, {});
};

export default prune;
