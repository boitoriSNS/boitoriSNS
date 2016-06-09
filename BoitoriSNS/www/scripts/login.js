var appKey = "2f7f81cde872870b3a9999523ed3225808d639982c9960164040315d53bc5777";
var clientKey = "f7b1ad0056482844b1d94b5acaa3d5b39b38b225ed62a47cae0dd3d6e27cfc1c";
var ncmb = new NCMB(appKey, clientKey);

///// Called when app launch
$(function () {
    $("#LoginBtn").click(onLoginBtn);
    $("#RegisterBtn").click(onRegisterBtn);
    $("#YesBtn_logout").click(onLogoutBtn);
});

//----------------------------------USER MANAGEMENT-------------------------------------//
var currentLoginUser; //���݃��O�C�������[�U�[

function onRegisterBtn() {
    //���̓t�H�[������username, password�ϐ��ɃZ�b�g
    var username = $("#reg_username").val();
    var password = $("#reg_password").val();

    var user = new ncmb.User();
    user.set("userName", username)
        .set("password", password);

    // �C�Ӄt�B�[���h�ɒl��ǉ� 
    user.signUpByAccount()
        .then(function (user) {
            alert("�V�K�o�^�ɐ���");
            currentLoginUser = ncmb.User.getCurrentUser();
            $.mobile.changePage('#DetailPage');
        })
        .catch(function (error) {
            alert("�V�K�o�^�Ɏ��s�I���̃G���[�����F" + error);
        });
}

function onLoginBtn() {
    var username = $("#login_username").val();
    var password = $("#login_password").val();
    // ���[�U�[���ƃp�X���[�h�Ń��O�C��
    ncmb.User.login(username, password)
        .then(function (user) {
            alert("���O�C������");
            currentLoginUser = ncmb.User.getCurrentUser();
            $.mobile.changePage('#DetailPage');
        })
        .catch(function (error) {
            alert("���O�C�����s�I���̃G���[����: " + error);
        });
}

function onLogoutBtn() {
    ncmb.User.logout();
    alert('���O�A�E�g����');
    currentLoginUser = null;
    $.mobile.changePage('#LoginPage');
}
