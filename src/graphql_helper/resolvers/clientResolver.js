import Client from "@/models/client.models";

const clientResolvers = {
  Query: {
    client: async (parent, { id }) => {
      try {
        if (id === "") {
          return new Error("Client Id are required!");
        }
        const client = await Client.findById(id);
        if (!client) {
          return new Error("Client are not found!");
        }
        return client;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    clients: async (parent, args) => {
      try {
        const clients = await Client.find();
        return clients;
      } catch (error) {
        console.log(error);
        throw new Error("error from server");
      }
    },
  },
  Mutation: {
    createClient: async (parent, args) => {
      try {
        const { name, email, phone, password, image, role, clientType } = args;

        const client = new Client({
          name,
          email,
          phone,
          password,
          image,
          role,
          clientType,
        });

        await client.save();

        return client;
      } catch (error) {
        console.log(error);
        throw new Error("error from server");
      }
    },
  },
};

export default clientResolvers;
