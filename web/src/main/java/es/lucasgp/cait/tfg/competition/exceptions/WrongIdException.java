package es.lucasgp.cait.tfg.competition.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "Trying to modifiy the wrong object")
public class WrongIdException extends RuntimeException {

}
