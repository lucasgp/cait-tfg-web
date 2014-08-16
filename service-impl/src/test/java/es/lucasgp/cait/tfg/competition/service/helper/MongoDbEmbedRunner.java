package es.lucasgp.cait.tfg.competition.service.helper;

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
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MongoDbEmbedRunner {

    private final int port = 27017;
    private final String dbName = "competition-db";

    private MongoClient mongoClient = null;
    private MongodExecutable mongodExecutable = null;
    private MongodProcess mongod = null;

    public boolean start() {

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
            while (!mongod.isProcessRunning() || (System.currentTimeMillis() - tInit > 10000L)) {
                Thread.sleep(1000L);
            }

            mongoClient = new MongoClient("localhost", port);

        } catch (IOException | InterruptedException ex) {
            Logger.getLogger(MongoDbEmbedRunner.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        }

        return true;
    }

    public void stop() {
        if (mongodExecutable != null) {
            mongoClient.close();
            mongod.stop();
            mongodExecutable.stop();
        }
    }

    public void dropDB() {
        mongoClient.dropDatabase(dbName);
    }

}
