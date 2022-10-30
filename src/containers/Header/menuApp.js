export const adminMenu = [
    { //quan ly nguoi dung
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },

        ]
    },
    { //quan ly chuyen khoa
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            }
        ]
    },
    { //quan ly cam nang (bai dang)
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            }
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { //quan ly ke hoach 
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            { //quan ly nguoi benh
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            }
        ]
    },
    { //quan ly phong kham
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.doctor.manage-clinic', link: '/room'
            }
        ]
    },
    { //quan ly cam nang (bai dang)
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            }
        ]
    },
];