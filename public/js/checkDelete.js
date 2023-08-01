const OkDelete = (event, form) => {
  event.preventDefault();
  let decision = confirm("Você deseja excluir ?");
  decision ? form.submit() : console.log("Você não quer deletar a categoria");
};
