// TODO: types for watched mutation link
import WatchedMutationLink from "apollo-link-watched-mutation";
import produce from "immer";

const createEdge = (node, typename) => ({ node, __typename: typename });

export default cache =>
  new WatchedMutationLink(cache, {
    CreateUserLandDutyMutation: {
      landDetailsQuery: ({ mutation, query }) => {
        try {
          const newULDEdge = createEdge(
            mutation.result.data.createUserLandDuty.userLandDuty,
            "UserLandDutyEdge"
          );
          return produce(query.result, draftResult => {
            const landDutyId = mutation.variables.input.landDutyId;
            draftResult.land.landDuties.edges
              .find(e => e.node.id === landDutyId)
              .node.userLandDuties.edges.push(newULDEdge);
          });
        } catch (e) {
          console.error(e);
          return query.result;
        }
      }
    },
    DeleteUserLandDutyMutation: {
      landDetailsQuery: ({ mutation, query }) => {
        try {
          return produce(query.result, draftResult => {
            // TODO: This is super not performant and terrible
            // If there is more than one in each userLandDuties this will fail
            // it needs to be scoped to 24 hours on the query.reslt to be 24 hours or
            // whatever length until the next duty is due
            const landDutyId =
              mutation.result.data.deleteUserLandDuty.userLandDuty.landDuty.id;
            draftResult.land.landDuties.edges.forEach(e =>
              draftResult.land.landDuties.edges
                .find(e => e.node.id === landDutyId)
                .node.userLandDuties.edges.splice(0)
            );
          });
        } catch (e) {
          console.error(e);
          return query.result;
        }
      }
    }
    // AssignLandDutiesMutation: {
    //   landDetailsQuery: ({ mutation, query }) => {
    //     try {
    //       const newEdges = query.result.
    //       );
    //       return produce(query.result, draftResult => {
    //         const landDutyId = mutation.variables.input.landDutyId;
    //         draftResult.land.landDuties.edges = newEdges
    //       });
    //     } catch (e) {
    //       console.error(e);
    //       return query.result;
    //     }
    //   }
    // },
  });

//   ReturnBook: {
//     MyCheckedOutBooks: ({ mutation, query }) => {
//       try {
//         const { bookId } = mutation.variables.input;
//         const index = query.result.myCheckedOutBooks.edges
//           .map(edge => edge.node.book.id)
//           .indexOf(bookId);
//         return produce(query.result, draftResult => {
//           draftResult.myCheckedOutBooks.edges.splice(index, 1);
//         });
//       } catch {
//         return query;
//       }
//     },
//   },
// });
