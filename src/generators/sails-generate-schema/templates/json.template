module.exports = {
  identity: '<%= entity %>',
  collectionName: '<%= entity %>',
  url: '/crud/<%= entity %>', // url for front api
  additionalProperties: false,
  autoValidate: true,
  schema: {
    $id: 'http://enyosolutions.com/schemas/<%= entity %>.json',
    type: 'object',
    properties: {
      _id: {
        $id: '_id',
        <% if (isSql) { %>type: 'number',<% } else { %>type: ['object', 'string'],<% } %>
        title: '<%= entity %> id', // serves for front form fields
        description: 'The id of this item' // serves for front form hint
      },<% for (var i = 0; i < fields.length; i++) { %>
      <%=fields[i] %>: {
        type: 'string',
      },<% } %>
      createdOn: {
        type: ['string', 'object'],
        format: 'date-time',
        field: { readonly: true },
        column: {
          type: 'datetime'
        }
      },
      lastModifiedOn: {
        type: ['string', 'object'],
        format: 'date-time',
        field: { readonly: true },
        column: {
          type: 'datetime'
        }
      },
      createdBy: {
        type: ['string'],
        relation: '/user',
        foreignKey: '_id',
        column: {},
        field: { readonly: true },
      },
      lastModifiedBy: {
        type: ['string'],
        relation: '/user',
        foreignKey: '_id',
        column: {},
        field: { readonly: true },
      }
    },
    required: []
  }
};
