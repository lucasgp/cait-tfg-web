package es.lucasgp.cait.tfg.competition.test.it.helper;

import com.mongodb.MongoClient;
import de.flapdoodle.embed.mongo.Command;
import de.flapdoodle.embed.mongo.MongodExecutable;
import de.flapdoodle.embed.mongo.MongodProcess;
import de.flapdoodle.embed.mongo.MongodStarter;
import de.flapdoodle.embed.mongo.config.ArtifactStoreBuilder;
import de.flapdoodle.embed.mongo.config.DownloadConfigBuilder;
import de.flapdoodle.embed.mongo.config.IMongodConfig;
import de.flapdoodle.embed.mongo.config.MongodConfigBuilder;
import de.flapdoodle.embed.mongo.config.Net;
import de.flapdoodle.embed.mongo.config.RuntimeConfigBuilder;
import de.flapdoodle.embed.mongo.distribution.Version;
import de.flapdoodle.embed.process.config.IRuntimeConfig;
import de.flapdoodle.embed.process.extract.UserTempNaming;
import de.flapdoodle.embed.process.runtime.Network;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MongoDbEmbedRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(MongoDbEmbedRunner.class);

    private static final int port = 27017;
    private static final String dbName = "competition-db";

    private static MongoClient mongoClient = null;
    private static MongodExecutable mongodExecutable = null;
    private static MongodProcess mongod = null;

    static {
        init();
    }

    public static void init() {

        synchronized (MongoDbEmbedRunner.class) {

            if (mongodExecutable == null) {

                LOGGER.info("Starting MongoDB");

                try {

                    Command command = Command.MongoD;

                    IRuntimeConfig runtimeConfig = new RuntimeConfigBuilder()
                        .defaults(command)
                        .artifactStore(new ArtifactStoreBuilder()
                            .defaults(command)
                            .download(new DownloadConfigBuilder()
                                .defaultsForCommand(command))
                            .executableNaming(new UserTempNaming()))
                        .build();

                    MongodStarter starter = MongodStarter.getInstance(runtimeConfig);

                    IMongodConfig mongodConfig = new MongodConfigBuilder()
                        .version(Version.Main.PRODUCTION)
                        .net(new Net(port, Network.localhostIsIPv6()))
                        .build();

                    mongodExecutable = starter.prepare(mongodConfig);
                    mongod = mongodExecutable.start();

                    long tInit = System.currentTimeMillis();

                    while (!mongod.isProcessRunning()) {

                        if ((System.currentTimeMillis() - tInit > 10000L)) {
                            throw new RuntimeException("Timeout starting embedded MongoDB");
                        }

                        Thread.sleep(1000L);

                    }

                    mongoClient = new MongoClient("localhost", port);

                } catch (IOException | InterruptedException ex) {
                    LOGGER.error("", ex);
                    throw new RuntimeException("Error starting MongoDB");
                }

                LOGGER.info("MongoDB started");
            }
        }

    }

    private MongoDbEmbedRunner() {
    }

    @Override
    public void finalize() throws Throwable {

        LOGGER.info("Stopping MongoDB");

        try {

            mongoClient.close();
            mongod.stop();

            long tInit = System.currentTimeMillis();

            while (mongod.isProcessRunning()) {

                if ((System.currentTimeMillis() - tInit > 10000L)) {
                    throw new RuntimeException("Timeout stoping embedded MongoDB");
                }

                Thread.sleep(1000L);
            }

            mongodExecutable.stop();
            mongodExecutable.cleanup();

        } catch (InterruptedException ex) {
            LOGGER.info("", ex);
        } finally {
            mongoClient = null;
            mongod = null;
            mongodExecutable = null;
        }

        LOGGER.info("MongoDB stopped");

        super.finalize();

    }

    public static void createDB() {
        LOGGER.info("Creating MongoDB {} database", dbName);
        mongoClient.getDB(dbName);
        LOGGER.info("Created MongoDB {} database", dbName);
    }

    public static void dropDB() {
        LOGGER.info("Dropping MongoDB {} database", dbName);
        mongoClient.dropDatabase(dbName);
        LOGGER.info("Dropped MongoDB {} database", dbName);
    }

}
