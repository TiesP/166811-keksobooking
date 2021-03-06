const {MongoClient, ObjectID, GridFSBucket} = require(`mongodb`);

const CHUNK_SIZE = 1024;

const getParamsDB = () => {
  const params = {};
  params.url = `mongodb://${process.env.DB_URL}`;
  params.dbName = (process.env.DB_MODE === `test`) ? process.env.DB_TEST_NANE : process.env.DB_NANE;
  params.collectionName = `offers`;
  return params;
};

const writeOffers = async (offers) => {
  const params = getParamsDB();
  const client = await MongoClient.connect(params.url);
  const db = client.db(params.dbName);
  const collection = db.collection(params.collectionName);
  await collection.deleteMany({});
  const result = await collection.insertMany(offers);
  client.close();
  return result;
};

const writeOffer = async (offer) => {
  const params = getParamsDB();
  const client = await MongoClient.connect(params.url);
  const db = client.db(params.dbName);
  const collection = db.collection(params.collectionName);
  const result = await collection.insertOne(offer);
  client.close();
  return result;
};


const getBucket = async (db) => {
  return new GridFSBucket(db, {
    chunkSizeBytes: CHUNK_SIZE,
    bucketName: `avatars`
  });
};


const findOffers = async (skip, limit) => {
  const params = getParamsDB();
  const client = await MongoClient.connect(params.url);
  const db = client.db(params.dbName);
  const collection = db.collection(params.collectionName);
  const result = await collection.find({}).skip(skip).limit(limit).toArray();
  client.close();
  return result;
};

const findOffer = async (date) => {
  const params = getParamsDB();
  const client = await MongoClient.connect(params.url);
  const db = client.db(params.dbName);
  const collection = db.collection(params.collectionName);
  const result = collection.findOne({date});
  client.close();
  return result;
};

const deleteOffer = async (_id) => {
  const params = getParamsDB();
  const client = await MongoClient.connect(params.url);
  const db = client.db(params.dbName);
  const collection = db.collection(params.collectionName);
  await collection.deleteOne({'_id': new ObjectID(_id)});
  client.close();
};


const writeAvatar = async (filename, stream) => {
  const params = getParamsDB();
  const client = await MongoClient.connect(params.url);
  const db = client.db(params.dbName);
  const bucket = await getBucket(db);
  return new Promise((success, fail) => {
    stream.pipe(bucket.openUploadStream(filename)).on(`error`, fail).on(`finish`, success);
  });
};

const findAvatar = async (filename) => {
  const params = getParamsDB();
  const client = await MongoClient.connect(params.url);
  const db = client.db(params.dbName);
  const bucket = await getBucket(db);

  const results = await (bucket).find({filename}).toArray();
  const entity = results[0];
  if (!entity) {
    return void 0;
  }
  return {info: entity, stream: bucket.openDownloadStreamByName(filename)};
};

module.exports = {
  writeOffers,
  findOffers,
  findOffer,
  writeOffer,
  deleteOffer,
  writeAvatar,
  findAvatar
};
