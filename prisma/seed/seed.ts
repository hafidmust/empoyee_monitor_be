import prisma from "../../src/db";
import bcrypt from 'bcrypt';  


const main = async () => {
    try {
        // await prisma.user.createMany({
        //     data: [
        //         {
        //             fullName: 'ABDUL RAHMAN HAKIM, S.IP',
        //             username: 'abdul.rahman',
        //             password: await bcrypt.hash('123',10),  // Gantilah dengan password yang di-hash
        //             role: 'ADMINISTRATOR',  // Sesuaikan dengan enum Role yang Anda miliki
        //             position: 'Lurah',
        //             nip: '196901111994021002',
        //           },
        //           {
        //             fullName: 'ARI SUSANTI, S.KOM',
        //             username: 'ari.susanti',
        //             password: await bcrypt.hash('123',10),  // Gantilah dengan password yang di-hashdengan password yang di-hash
        //             role: 'STAFF',  // Sesuaikan dengan enum Role yang Anda miliki
        //             position: 'Plt. Sekkel / Kasi Ekbang',
        //             nip: '198507012010012034',
        //           },
        //           {
        //             fullName: 'HUSNIYATI HANDAYANI RUSNI, S.STP,M.EC.DEV',
        //             username: 'husniyati.handayani',
        //             password: await bcrypt.hash('123',10),  // Gantilah dengan password yang di-hash
        //             role: 'STAFF',  // Sesuaikan dengan enum Role yang Anda miliki
        //             position: 'Plt. Kasi Kesra / Kasi Pem',
        //             nip: '199112262010102001',
        //           },
        //           {
        //             fullName: 'UNDAN ZULFIKAR HIDAYAT',
        //             username: 'undan.zulfikar',
        //             password: await bcrypt.hash('123',10),  // Gantilah dengan password yang di-hash
        //             role: 'STAFF',  // Sesuaikan dengan enum Role yang Anda miliki
        //             position: 'Bendahara Keuangan',
        //           },
        //           {
        //             fullName: 'YUSNIA DEWI',
        //             username: 'yusnia.dewi',
        //             password: await bcrypt.hash('123',10),  // Gantilah dengan password yang di-hash
        //             role: 'STAFF',  // Sesuaikan dengan enum Role yang Anda miliki
        //             position: 'Bendahara Barang',
        //             nip: '198206232010012025',
        //           },
        //           {
        //             fullName: 'SURATNO',
        //             username: 'suratno',
        //             password: await bcrypt.hash('123',10),  // Gantilah dengan password yang di-hash
        //             role: 'STAFF',  // Sesuaikan dengan enum Role yang Anda miliki
        //             position: 'Staf Kasi Pem',
        //             nip: '196705081987031004',
        //           },
        //           {
        //             fullName: 'SUHARTI SULASTRI',
        //             username: 'suharti.sulastri',
        //             password: await bcrypt.hash('123',10),  // Gantilah dengan password yang di-hash
        //             role: 'STAFF',  // Sesuaikan dengan enum Role yang Anda miliki
        //             position: 'Staf Kasi Kesra',
        //             nip: '197702081998032004',
        //           },
        //     ]
        // })
        await prisma.menu.createMany({
          data: [
            {
              icon: "note_add",
              text: "Laporan",
              color: "red",
              route: "/add_laporan",
              allowedRoles: ["STAFF", "ADMINISTRATOR", "SUPERVISOR"]
            },
            {
              icon: "add_task",
              text: "Tugas",
              color: "red",
              route: "/add_tugas",
              allowedRoles: ["ADMINISTRATOR", "SUPERVISOR"]
            },
            {
              icon: "format_list_bulleted",
              text: "List Report",
              color: "red",
              route: "/list_validation",
              allowedRoles: ["SUPERVISOR"]
            }
          ]
        })
    }catch(e){
        console.log(e);
    }
}
main().catch((err)=>{
    console.warn(`error when seeding data: ${err}`)
})